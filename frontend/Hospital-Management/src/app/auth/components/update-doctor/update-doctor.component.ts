import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { Doctor, DoctorService } from '../../services/doctor.service';

@Component({
  standalone: true,
  selector: 'app-update-doctor',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './update-doctor.component.html',
  styleUrls: ['./update-doctor.component.css']
})
export class UpdateDoctorComponent implements OnInit {
  doctorId!: number;
  doctor: Doctor | null = null;
  name: string = '';
  specialty: string = '';
  email: string = '';
  errorMsg: string = '';
  showSuccessPopup: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.doctorId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.doctorId) {
      this.loadDoctor();
    } else {
      this.errorMsg = 'Invalid doctor ID.';
    }
  }

  loadDoctor(): void {
    this.doctorService.getDoctorById(this.doctorId).subscribe({
      next: (data) => {
        this.doctor = data;
        this.name = data.name;
        this.specialty = data.specialty;
        this.email = data.email;
      },
      error: (error) => {
        this.errorMsg = 'Failed to load doctor data.';
      }
    });
  }

  updateDoctor(): void {
    this.errorMsg = '';

    if (!this.name.trim() || !this.specialty.trim() || !this.email.trim()) {
      this.errorMsg = 'All fields are required.';
      return;
    }
    if (this.name.length > 100 || this.specialty.length > 100 || this.email.length > 100) {
      this.errorMsg = 'Each field max length is 100 characters.';
      return;
    }

    const updatedDoctor: Doctor = {
      id: this.doctorId,
      name: this.name.trim(),
      specialty: this.specialty.trim(),
      email: this.email.trim(),
    };

    const userId = 'exampleUserId';  // Replace with actual user ID logic

    this.doctorService.updateDoctor(userId, this.doctorId, updatedDoctor).subscribe({
      next: () => {
        this.showSuccessPopup = true;
        setTimeout(() => {
          this.showSuccessPopup = false;
          this.router.navigate(['/admin-dashboard']);
        }, 2000);
      },
      error: () => {
        this.errorMsg = 'Failed to update doctor.';
      }
    });
  }
}
