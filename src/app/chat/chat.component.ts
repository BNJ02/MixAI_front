import { NgClass } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { slideInFromLeft } from '../animations/animations';
import { AuthService } from '../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninSuccessService } from '../services/signinSuccess.service';
import { SigninSuccess } from '../types/signinSuccess.interface';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { UserService } from '../services/user.service';
import { User } from '../types/user.interface';
import { GeminiService } from '../services/gemini.service';
import { BehaviorSubject, tap } from 'rxjs';

export interface Model {
  name: string;
}

export interface Discussion {
  role: 'user' | 'ai';
  content: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgClass, CommonModule, AlertComponent, ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  animations: [slideInFromLeft],
})
export class ChatComponent {
  @ViewChild('chatBody') chatBody!: ElementRef;
  alertMessage: any;
  public promptForm: FormGroup;

  public chatResponses: BehaviorSubject<Discussion[]> = new BehaviorSubject<
    Discussion[]
  >([]);
  public chatResponses$ = this.chatResponses.asObservable();

  constructor(
    private authService: AuthService,
    private signinSuccessService: SigninSuccessService,
    private userService: UserService,
    private router: Router,
    private geminiService: GeminiService,
    private fb: FormBuilder
  ) {
    this.promptForm = this.fb.group({
      prompt: ['', [Validators.required]],
    });
  }

  public user: User | null;

  public sideNavOpen = false;
  public registrationCompleted: boolean;
  public signinSuccess: SigninSuccess;
  public signinSuccessMessage: string = 'Great to see you back again';

  public models: Model[] = [
    { name: 'Gemini' },
    { name: 'ChatGPT' },
    { name: 'Mistral AI' },
  ];

  public showFiller = false;
  public discussions = [
    { title: 'Discussion 1', content: 'Contenu de la discussion 1' },
    { title: 'Discussion 2', content: 'Contenu de la discussion 2' },
  ];

  public filteredDiscussions = [...this.discussions];
  public selectedDiscussion: { title: string; content: string } | null = null;

  public async ngOnInit(): Promise<void> {
    const signinData = this.signinSuccessService.getSigninData();

    // Recharger l'utilisateur à chaque visite de la page
    this.userService.getMe().subscribe((user) => {
      if (user) {
        this.user = user;
        this.signinSuccessMessage = `Great to see you back again, ${this.user.firstName}!`;
      } else {
        this.user = null; // Si l'utilisateur n'est pas trouvé
      }
    });

    if (!signinData) {
      this.router.navigate(['/connexion']);
      return;
    } else {
      this.signinSuccess = signinData;
      this.registrationCompleted = true;
      setTimeout(() => {
        this.registrationCompleted = false;
      }, 5000);
    }
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
  private scrollToBottom(): void {
    if (this.chatBody) {
      this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
    }
  }

  public filterDiscussions(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredDiscussions = this.discussions.filter((d) =>
      d.title.toLowerCase().includes(query)
    );
  }

  public selectDiscussion(discussion: {
    title: string;
    content: string;
  }): void {
    this.selectedDiscussion = discussion;
  }

  public onPrompt(): void {
    this.chatResponses.next([
      ...this.chatResponses.getValue(),
      { role: 'user', content: this.promptForm.get('prompt')?.value },
    ]);

    this.geminiService
      .askGemini(this.promptForm.get('prompt')?.value)
      .pipe(
        tap((res: string) =>
          this.chatResponses.next([
            ...this.chatResponses.getValue(),
            { role: 'ai', content: res },
          ])
        )
      )
      .subscribe();

    // Réinitialiser l'input à vide après soumission
    this.promptForm.get('prompt')?.setValue('');
  }

  public deleteDiscussion(discussion: {
    title: string;
    content: string;
  }): void {
    this.discussions = this.discussions.filter((d) => d !== discussion);
    this.filteredDiscussions = this.filteredDiscussions.filter(
      (d) => d !== discussion
    );
    this.selectedDiscussion =
      this.selectedDiscussion === discussion ? null : this.selectedDiscussion;

    if (this.discussions.length === 0) {
      this.selectedDiscussion = null;
    }
  }

  public addDiscussion(): void {
    this.discussions.push({
      title: `Discussion ${this.discussions.length + 1}`,
      content: `Contenu de la discussion ${this.discussions.length + 1}`,
    });

    this.filteredDiscussions = [...this.discussions];
  }

  public logout(): void {
    this.authService.logout();
  }

  public profile(): void {
    this.router.navigate(['/profile']);
  }
}
