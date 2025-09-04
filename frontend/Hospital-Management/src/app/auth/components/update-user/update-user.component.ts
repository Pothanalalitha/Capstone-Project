import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UpdateUserRequest } from '../../models/update-user-request.model';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  imports: [ReactiveFormsModule],
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  updateForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.updateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const userId = this.getCurrentUserId();

    this.userService.getUser(userId).subscribe({
      next: (user) => {
        this.updateForm.patchValue({
          email: user.email,
          role: user.role,
        });
      },
      error: (err) => {
        this.errorMessage = err.error || 'Failed to load user details';
      },
    });
  }

  onSubmit() {
    if (this.updateForm.invalid) {
      return;
    }

    const userId = this.getCurrentUserId();
    const updateData: UpdateUserRequest = this.updateForm.value;

    this.userService.updateUser(userId, updateData).subscribe({
      next: () => {
        this.errorMessage = null;
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        this.errorMessage = err.error || 'Failed to update user';
      },
    });
  }

  getCurrentUserId(): number {
    // Replace with real logic to get logged-in user's id from JWT
    return 1;
  }
}
