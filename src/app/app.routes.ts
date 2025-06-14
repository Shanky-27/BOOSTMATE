import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AuthGuard } from './guards/auth.guard'; // 👈 Import your guard

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // ✅ Default to Home
  { path: 'home', component: HomeComponent },          // ✅ Home route
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactUsComponent,canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' } // wildcard fallback
];
