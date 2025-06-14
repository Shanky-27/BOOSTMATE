import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private auth = inject(Auth);
  private router = inject(Router);

  canActivate(): Observable<boolean> {
    return new Observable(subscriber => {
      const unsubscribe = this.auth.onAuthStateChanged(user => {
        if (user) {
          subscriber.next(true);
        } else {
          this.router.navigate(['/login']);
          subscriber.next(false);
        }
        subscriber.complete();
      });

      return { unsubscribe };
    });
  }
}
