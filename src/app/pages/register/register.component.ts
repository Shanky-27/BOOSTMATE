import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule, CommonModule],
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  errorMsg = '';
  googleLoginInProgress = false;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.errorMsg = '';
    if (this.password !== this.confirmPassword) {
      this.errorMsg = 'Passwords do not match';
      return;
    }

    this.authService.signUp(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => (this.errorMsg = err.message || 'Registration failed'),
    });
  }

  async registerWithGoogle() {
    if (this.googleLoginInProgress) return;
    this.googleLoginInProgress = true;
    this.errorMsg = '';

    const user = await this.authService.signInWithGoogle();

    if (user) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMsg = 'Google sign-in failed or was cancelled.';
    }

    this.googleLoginInProgress = false;
  }
}
