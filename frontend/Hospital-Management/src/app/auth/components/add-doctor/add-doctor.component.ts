import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { Doctor, DoctorService } from '../../services/doctor.service';

@Component({
  standalone: true,
  selector: 'app-add-doctor',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent {
  name: string = '';
  specialty: string = '';
  email: string = '';
  errorMsg: string = '';
  showSuccessPopup: boolean = false;

  constructor(private doctorService: DoctorService, private router: Router) {}

  addDoctor(): void {
    this.errorMsg = '';

    if (!this.name.trim() || !this.specialty.trim() || !this.email.trim()) {
      this.errorMsg = 'All fields are required.';
      return;
    }
    if (this.name.length > 100 || this.specialty.length > 100 || this.email.length > 100) {
      this.errorMsg = 'Each field max length is 100 characters.';
      return;
    }

    const newDoctor: Doctor = {
      id: 0,  // Assuming backend generates id
      name: this.name.trim(),
      specialty: this.specialty.trim(),
      email: this.email.trim(),
    };

    const userId = 'exampleUserId';  // Replace with actual user ID logic

    this.doctorService.createDoctor(userId, newDoctor).subscribe({
      next: () => {
        this.showSuccessPopup = true;
        setTimeout(() => {
          this.showSuccessPopup = false;
          this.router.navigate(['/admin-dashboard']);
        }, 2000);
      },
      error: () => {
        this.errorMsg = 'Failed to add doctor.';
      }
    });
  }
}
