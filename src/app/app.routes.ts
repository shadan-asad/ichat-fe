import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/chat', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [AuthGuard],
  },
  // Add other routes as needed
  { path: '**', redirectTo: '/chat' }, // Redirect any unknown routes to chat (or handle as needed)
];
