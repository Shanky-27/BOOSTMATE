import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User | null = null;
  private sub!: Subscription;
  defaultAvatar = '/assets/default-avatar.png';

  popupVisible = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.sub = this.authService.getCurrentUserObservable().subscribe(user => {
      this.user = user;
    });
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

  togglePopup(): void {
    this.popupVisible = !this.popupVisible;

    // Optional: auto-hide popup after 4 seconds
    if (this.popupVisible) {
      setTimeout(() => (this.popupVisible = false), 4000);
    }
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
