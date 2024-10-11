import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { slideInFromLeft } from '../animations/animations';


export interface Model {
  name: string
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgClass],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  animations: [slideInFromLeft]
})
export class ChatComponent {

  public sideNavOpen = false;

  public models: Model[] = [
    {
      name: 'chatGPT'
    },
    {
      name: 'Mistral AI'
    }
  ];



}
