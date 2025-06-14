import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule,FormsModule],
  template: `<button (click)="loginWithGoogle()">Sign in with Google</button>`,
})
export class LoginComponent {
  email = '';
  password = '';
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.signIn(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => (this.errorMsg = err.message),
    });
  }

  loginInProgress = false;

async loginWithGoogle() {
  if (this.loginInProgress) return;  // prevent multiple calls

  this.loginInProgress = true;
  try {
    const user = await this.authService.signInWithGoogle();
    if (user) {
      console.log('Logged in as', user.displayName);
      this.router.navigate(['/dashboard']); // redirect after login
    }
  } catch (error) {
    console.error('Google sign-in error:', error);
  } finally {
    this.loginInProgress = false;
  }
}

}
