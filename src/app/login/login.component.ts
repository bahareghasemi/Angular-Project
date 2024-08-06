import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = {
    invalid: false,
    touched: false
  };
  password = {
    invalid: false,
    touched: false
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(loginForm: NgForm) {
    const { username, password } = loginForm.value;

    if (loginForm.valid) {
      this.authService.login(username, password).subscribe({
        next: (auth) => {
          if (auth.token) {
            console.log('Login successful');
            this.router.navigate(['/api-data']);
          } else {
            console.log('Login failed');
            this.username.invalid = true;
            this.password.invalid = true;
          }
        },
        error: (err) => {
          console.log('Login failed', err);
          this.username.invalid = true;
          this.password.invalid = true;
        }
      });
    }
  }
}
