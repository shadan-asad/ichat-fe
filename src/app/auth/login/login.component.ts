// login.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  formData: any = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.formData.value).subscribe(
      (data: any) => {
        console.log('login: ', data);
        localStorage.setItem('token', data.jwt);
        localStorage.setItem('username', data.user.username);
        localStorage.setItem('userid', data.user.id);
        // Redirect to chat component or dashboard
        this.router.navigate(['/chat']);
      },
      (error) => {
        // Handle login error, e.g., display error message
        console.error('Login error:', error);
      }
    );
  }
}
