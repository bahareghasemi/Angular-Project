import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, IAuth } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  authToken: IAuth = { token: '' };
  errorMessage: string = '';

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService
        .register(
          this.registerForm.value.username!,
          this.registerForm.value.email!,
          this.registerForm.value.password!
        )
        .subscribe({
          next: (token) => {
            console.log(token);
            this.router.navigateByUrl('/login');
          },
          error: (e) => {
            console.log(e);
            this.errorMessage = 'Registration failed';
          },
          complete: () => {
            console.info('complete');
          }
        });
    }
  }
}
