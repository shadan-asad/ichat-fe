import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl(['', Validators.required]),
      email: new FormControl(['', [Validators.required, Validators.email]]),
      password: new FormControl([
        '',
        [Validators.required, Validators.minLength(6)],
      ]),
      confirmPassword: new FormControl(['', Validators.required]),
    });
  }

  // Getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // Register user
    this.authService.register(this.registerForm.value).subscribe(
      (data: any) => {
        console.log('Registration successful', data);
        // Handle successful registration (e.g., navigate to login page or show a success message)
      },
      (error: any) => {
        console.error('Registration error', error);
        // Handle registration error (e.g., show an error message)
      }
    );
  }

  // Custom validator to check if passwords match
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // Return if another validator has already found an error on the matchingControl
        return;
      }

      // Set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
