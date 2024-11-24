import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { slideInFromLeft } from '../animations/animations';
import { AuthService } from '../services/auth.service';

// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SigninSuccessService } from '../services/signinSuccess.service';
import { SigninSuccess } from '../types/signinSuccess.interface';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { UserService } from '../services/user.service';
import { User } from '../types/user.interface';

export interface Model {
  name: string
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgClass, MatSidenavModule, MatIconModule, MatListModule, MatFormFieldModule, CommonModule, AlertComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  animations: [slideInFromLeft]
})
export class ChatComponent {
alertMessage: any;
  constructor(
    private authService: AuthService, 
    private signinSuccessService: SigninSuccessService,
    private userService: UserService,
    private router: Router
  ) {}

  public user: User | null;

  public sideNavOpen = false;
  public registrationCompleted: boolean;
  public signinSuccess: SigninSuccess;
  public signinSuccessMessage: string = 'Great to see you back again';

  public models: Model[] = [
    { name: 'Gemini'},
    { name: 'ChatGPT'},
    { name: 'Mistral AI'}
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

  public filterDiscussions(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredDiscussions = this.discussions.filter((d) =>
      d.title.toLowerCase().includes(query)
    );
  }

  public selectDiscussion(discussion: { title: string; content: string }): void {
    this.selectedDiscussion = discussion;
  }

  public deleteDiscussion(discussion: { title: string; content: string }): void {
    this.discussions = this.discussions.filter((d) => d !== discussion);
    this.filteredDiscussions = this.filteredDiscussions.filter((d) => d !== discussion);
    this.selectedDiscussion
      = this.selectedDiscussion === discussion ? null : this.selectedDiscussion;

    if (this.discussions.length === 0) {
      this.selectedDiscussion = null;
    }
  }

  public addDiscussion(): void {
    this.discussions.push({
      title: `Discussion ${this.discussions.length + 1}`,
      content: `Contenu de la discussion ${this.discussions.length + 1}`
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
