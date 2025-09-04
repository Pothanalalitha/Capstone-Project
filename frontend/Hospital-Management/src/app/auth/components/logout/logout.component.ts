import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout',
  template: `<p>Logging out...</p>`,
  styles: [
    `
      p {
        font-family: Arial, sans-serif;
        text-align: center;
        margin-top: 50px;
      }
    `,
  ],
})
export class LogoutComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
