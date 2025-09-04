import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Hospital-Management';

  showLogoutPopup = false;
  showLoginPopup = false;
  onLoginPage = false;

  constructor(public authService: AuthService, private router: Router) {
    // Detect if current route is login page or profile for showing messages
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.onLoginPage = this.router.url === '/login';

      // Check URL query params to show login success popup
      const urlTree = this.router.parseUrl(this.router.url);
      if (urlTree.queryParams['loginSuccess'] === 'true') {
        this.showLoginPopup = true;
        setTimeout(() => {
          this.showLoginPopup = false;
          // Remove query param without reloading page
          this.router.navigate([], { queryParams: { loginSuccess: null }, queryParamsHandling: 'merge' });
        }, 1000); // Show login popup for 1 second
      }
    });
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get userRole(): string | null {
    return this.authService.getUserRole ? this.authService.getUserRole() : null;
  }

  onLogout() {
    this.authService.logout();
    this.showLogoutPopup = true;
    setTimeout(() => {
      this.showLogoutPopup = false;
      this.router.navigate(['/']); // Redirect to main page after 1 second
    }, 1000);
  }
}
