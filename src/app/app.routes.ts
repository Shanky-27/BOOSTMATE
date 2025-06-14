import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';  // Import HomeComponent

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default redirect to login page
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: HomeComponent },  // Add Home route
  { path: '**', redirectTo: '' } // Fallback to login if any route is incorrect
];
