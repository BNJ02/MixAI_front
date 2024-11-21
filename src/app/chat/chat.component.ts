import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { slideInFromLeft } from '../animations/animations';

// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface Model {
  name: string
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgClass, MatSidenavModule, MatIconModule, MatListModule, MatFormFieldModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  animations: [slideInFromLeft]
})
export class ChatComponent {
  showFiller = false;
  discussions = [
    { title: 'Discussion 1', content: 'Contenu de la discussion 1' },
    { title: 'Discussion 2', content: 'Contenu de la discussion 2' },
    { title: 'Discussion 3', content: 'Contenu de la discussion 3' },
    { title: 'Discussion 4', content: 'Contenu de la discussion 4' },
    { title: 'Discussion 5', content: 'Contenu de la discussion 5' },
    { title: 'Discussion 6', content: 'Contenu de la discussion 6' },
    { title: 'Discussion 7', content: 'Contenu de la discussion 7' },
    { title: 'Discussion 8', content: 'Contenu de la discussion 8' },
    { title: 'Discussion 9', content: 'Contenu de la discussion 9' },
    { title: 'Discussion 10', content: 'Contenu de la discussion 10'},
    { title: 'Discussion 11', content: 'Contenu de la discussion 11'},
    { title: 'Discussion 12', content: 'Contenu de la discussion 12'},
    { title: 'Discussion 13', content: 'Contenu de la discussion 13'},
    { title: 'Discussion 14', content: 'Contenu de la discussion 14'},
    { title: 'Discussion 15', content: 'Contenu de la discussion 15'},
    { title: 'Discussion 16', content: 'Contenu de la discussion 16'},
    { title: 'Discussion 17', content: 'Contenu de la discussion 17'},
    { title: 'Discussion 18', content: 'Contenu de la discussion 18'},
    { title: 'Discussion 19', content: 'Contenu de la discussion 19'},
    { title: 'Discussion 20', content: 'Contenu de la discussion 20'},
    { title: 'Discussion 21', content: 'Contenu de la discussion 21'},
    { title: 'Discussion 22', content: 'Contenu de la discussion 22'},
    { title: 'Discussion 23', content: 'Contenu de la discussion 23'},
    { title: 'Discussion 24', content: 'Contenu de la discussion 24'},
    { title: 'Discussion 25', content: 'Contenu de la discussion 25'},
    { title: 'Discussion 26', content: 'Contenu de la discussion 26'},
    { title: 'Discussion 27', content: 'Contenu de la discussion 27'},
    { title: 'Discussion 28', content: 'Contenu de la discussion 28'},
    { title: 'Discussion 29', content: 'Contenu de la discussion 29'},
    { title: 'Discussion 30', content: 'Contenu de la discussion 30'},
    { title: 'Discussion 31', content: 'Contenu de la discussion 31'},
    { title: 'Discussion 32', content: 'Contenu de la discussion 32'},
    { title: 'Discussion 33', content: 'Contenu de la discussion 33'},
    { title: 'Discussion 34', content: 'Contenu de la discussion 34'},
    { title: 'Discussion 35', content: 'Contenu de la discussion 35'},
  ];

  filteredDiscussions = [...this.discussions];
  selectedDiscussion: { title: string; content: string } | null = null;

  filterDiscussions(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredDiscussions = this.discussions.filter((d) =>
      d.title.toLowerCase().includes(query)
    );
  }

  selectDiscussion(discussion: { title: string; content: string }): void {
    this.selectedDiscussion = discussion;
  }

  public sideNavOpen = false;

  public models: Model[] = [
    {
      name: 'Gemini'
    },
    {
      name: 'ChatGPT'
    },
    {
      name: 'Mistral AI'
    }
  ];
}
