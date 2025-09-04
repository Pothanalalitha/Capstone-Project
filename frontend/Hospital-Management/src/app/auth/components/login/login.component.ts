import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['loginSuccess'] === 'true') {
        this.successMessage = 'Logged in successfully!';
      } else if (params['registered'] === 'true') {
        this.successMessage = 'User registered successfully! Please log in.';
      }
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginData = this.loginForm.value;

    this.authService.login(loginData).subscribe({
      next: () => {
        this.errorMessage = null;
        // Navigate to profile with success query param to show message on login page if needed
        this.router.navigate(['/profile'], { queryParams: { loginSuccess: 'true' } });
      },
      error: (err: Error) => {
        this.errorMessage = err.message || 'Login failed: Invalid email or password.';
      },
    });
  }
}
