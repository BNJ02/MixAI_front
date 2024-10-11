import { trigger, state, style, animate, transition } from '@angular/animations';

export const slideInFromLeft = trigger('slideInFromLeft', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)', opacity: 0 }), // Départ à gauche
    animate('0.5s ease-out', style({ transform: 'translateX(0)', opacity: 1 })) // Glisse vers la position finale
  ]),
  transition(':leave', [
    animate('0.3s ease-in', style({ transform: 'translateX(-100%)', opacity: 0 })) // Glisse en sortie
  ])
]);
