import { NgClass } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { slideInFromLeft } from '../animations/animations';
import { AuthService } from '../services/auth.service';
import {
  FormsModule,
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
import { BehaviorSubject, delay, tap } from 'rxjs';
import { marked } from 'marked';
import { Discussion } from '../types/discussion.interface';
import { EntireDiscussion } from '../types/entire_discussion.interface';
import { DiscussionService } from '../services/discussion.service';

export interface Model {
  name: string;
  moduleName: string;
}

// history: Array<{ role: string; parts: Array<{ text: string }> }>;
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgClass, CommonModule, AlertComponent, ReactiveFormsModule, FormsModule],
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

  trackByFn(index: number, item: any): number {
    return item.id;
  }

  constructor(
    private authService: AuthService,
    private signinSuccessService: SigninSuccessService,
    private userService: UserService,
    private router: Router,
    private geminiService: GeminiService,
    private discussionService: DiscussionService,
    private fb: FormBuilder
  ) {
    this.promptForm = this.fb.group({
      prompt: ['', [Validators.required]],
    });
  }

  public user: User | null;

  public discussionsLoaded: boolean = false;
  public isLoadingResponse: boolean = false;

  public sideNavOpen = false;
  public registrationCompleted: boolean;
  public signinSuccess: SigninSuccess;
  public signinSuccessMessage: string = 'Great to see you back again';

  public models: Model[] = [
    { name: 'Gemini 1.5 Flash', moduleName: 'gemini-1.5-flash' },
    { name: 'Gemini 1.5 Flash-8B', moduleName: 'gemini-1.5-flash-8b' },
    { name: 'Gemini 1.5 Pro', moduleName: 'gemini-1.5-pro' },
    { name: 'Gemini 1.0 Pro', moduleName: 'gemini-1.0-pro' },
  ];
  public selectedModel: string = '';
  public selectModelObject: Model = this.models[0];

  public showFiller = false;
  public discussions: EntireDiscussion[] = [];

  public selectedDiscussion: EntireDiscussion | null = null;

  public onModelChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    this.selectedModel = selectedValue;
    console.log('Selected model:', selectedValue);
  }

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

    // Charger toutes les discussions de l'utilisateur
    this.discussionService.getAllDiscussions().subscribe((discussions: any) => {
      this.discussions = discussions.map((discussion: { id: number; history: any[]; }) => ({
        ...this.discussions,
        id: discussion.id,
        title: `Discussion ${discussion.id}`,
        content: discussion.history.map(historyItem => ({
          role: historyItem.role,
          parts: historyItem.parts.map((part: { text: any; }) => ({ text: part.text }))
        }))
      }));

      this.discussionsLoaded = true;
      this.selectDiscussion(this.discussions[0])
      this.selectedDiscussion = this.discussions[0];
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

  public async selectDiscussion(discussion: EntireDiscussion): Promise<void> {
    this.selectedDiscussion = discussion;
    // Mettre à jour le contenu du chat avec la discussion sélectionnée
    const formattedContent = await Promise.all(discussion.content.map(async item => ({
      ...item,
      parts: await Promise.all(item.parts.map(async part => {
        let textFormatted: string = await marked(part.text);
        textFormatted = textFormatted.replace(/\n$/, '');
        return { text: textFormatted };
      }))
    })));
    this.chatResponses.next(formattedContent);

    // Charger toutes les discussions de l'utilisateur
    this.discussionService.getAllDiscussions().subscribe((discussions: any) => {
      this.discussions = discussions.map((discussion: { id: number; history: any[]; }) => ({
        ...this.discussions,
        id: discussion.id,
        title: `Discussion ${discussion.id}`,
        content: discussion.history.map(historyItem => ({
          role: historyItem.role,
          parts: historyItem.parts.map((part: { text: any; }) => ({ text: part.text }))
        }))
      }));
    });
  }

  public onPrompt(): void {
    this.chatResponses.next([
      ...this.chatResponses.getValue(),
      { role: 'user', parts: [{ text: this.promptForm.get('prompt')?.value }] },
    ]);

    this.selectModelObject = this.models.find(model => model.name === this.selectedModel) || this.models[0];
    console.log('TEST : ', this.selectModelObject)

    if (this.selectedDiscussion?.id !== undefined) {
      this.isLoadingResponse = true; // Début du chargement

      this.geminiService
          .askGeminiWithHistory(this.selectedDiscussion.id, this.promptForm.get('prompt')?.value, this.selectModelObject.moduleName)
          .pipe(
            tap(async (res: string) => {
              let response_formatted: string = await marked(res);
              response_formatted = response_formatted.replace(/\n$/, '');
              this.chatResponses.next([
                  ...this.chatResponses.getValue(),
                  { role: 'model', parts: [{ text: response_formatted }] },
              ]);
              this.isLoadingResponse = false; // Fin du chargement
            })
          )
          .subscribe();
    }

    // Réinitialiser l'input à vide après soumission
    this.promptForm.get('prompt')?.setValue('');
  }

  public deleteDiscussion(discussion: EntireDiscussion): void {
    console.log('Deleting discussion:', discussion.id);
    this.discussionService.deleteDiscussion(discussion.id).subscribe((res) => {
      console.log('Discussion deleted:', res);
      this.discussions = this.discussions.filter((d) => d.id !== discussion.id);
    });
  }

  public addDiscussion(): void {
    this.discussionService.createDiscussion().subscribe((res) => {
      console.log('Discussion created:', res);
      const newEntireDiscussion = {
        id: res.id,
        title: `Discussion ${res.id}`,
        content: res.history,
      };
      this.discussions.push(newEntireDiscussion);
    });
  }

  public logout(): void {
    this.authService.logout();
  }

  public profile(): void {
    this.router.navigate(['/profile']);
  }
}
