import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  name = '';
  email = '';
  message = '';
  showThankYou = false;

  constructor(private router: Router) {}

  submitForm() {
    if (!this.name || !this.email || !this.message) return;

    this.showThankYou = true;
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 3000); // Redirect to home after 3 seconds
  }
}
