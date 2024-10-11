import { Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'signin', component: ConnexionComponent },
    { path: 'signup', component: InscriptionComponent },
    { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
];
