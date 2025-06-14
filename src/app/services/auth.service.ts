import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from, Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);

  constructor(private auth: Auth, private router: Router) {
    // Watch Firebase auth state and update BehaviorSubject
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  // Sign in with email and password
  signIn(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  // Sign up with email and password
  signUp(email: string, password: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  // Sign out and redirect to login
  logout(): Promise<void> {
    return signOut(this.auth).then(() => {
      this.router.navigate(['/login']);
    });
  }

  // Sign in with Google popup
  async signInWithGoogle(): Promise<User | null> {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      return result.user;
    } catch (error) {
      console.error('Google sign-in error:', error);
      return null;
    }
  }

  // Synchronous getter for current user (not reactive)
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  // Reactive user observable (used in components)
  getCurrentUserObservable(): Observable<User | null> {
    return this.userSubject.asObservable();
  }
}
