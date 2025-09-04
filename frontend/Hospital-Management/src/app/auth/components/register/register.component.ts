import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  roles = ['ADMIN', 'DOCTOR', 'PATIENT'];

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['USER', Validators.required],
    });
  }

  onSubmit() {
    console.log('Form valid?', this.registerForm.valid);
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const registerData = this.registerForm.value;

    this.authService.register(registerData).subscribe({
      next: (response: string) => {
        this.errorMessage = null;
        console.log('Registration successful:', response);
        // Redirect to login page with query param for success message display
        this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
      },
      error: (err: any) => {
        console.error('Registration error:', err);
        this.errorMessage = err.message || 'Registration failed. Please try again.';
      },
    });
  }
}
