import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PatientService, Patient } from '../../services/patient.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-add-patient',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent {
  name: string = '';
  address: string = '';
  gender: string = '';
  dob: string = '';
  weight: number | null = null;
  height: number | null = null;
  errorMsg: string = '';
  showSuccessPopup: boolean = false;

  constructor(private patientService: PatientService, private router: Router) {}

  addPatient(): void {
    this.errorMsg = '';

    if (
      !this.name.trim() ||
      !this.address.trim() ||
      !this.gender.trim() ||
      !this.dob ||
      this.weight === null ||
      this.height === null
    ) {
      this.errorMsg = 'All fields are required.';
      return;
    }

    if (this.name.length > 100) {
      this.errorMsg = 'Name max length is 100 characters.';
      return;
    }

    if (this.address.length > 255) {
      this.errorMsg = 'Address max length is 255 characters.';
      return;
    }

    if (!['Male', 'Female', 'Other'].includes(this.gender)) {
      this.errorMsg = 'Gender must be Male, Female, or Other.';
      return;
    }

    const dobDate = new Date(this.dob);
    if (dobDate >= new Date()) {
      this.errorMsg = 'Date of Birth must be in the past.';
      return;
    }

    if (this.weight <= 0) {
      this.errorMsg = 'Weight must be greater than 0.';
      return;
    }

    if (this.height <= 0) {
      this.errorMsg = 'Height must be greater than 0.';
      return;
    }

    const newPatient: Patient = {
      id: 0,
      name: this.name.trim(),
      address: this.address.trim(),
      gender: this.gender,
      dob: this.dob,
      weight: this.weight,
      height: this.height
    };

    const userId = 'exampleUserId'; // Replace with actual user ID logic

    this.patientService.createPatient(userId, newPatient).subscribe({
      next: () => {
        this.showSuccessPopup = true;
        setTimeout(() => {
          this.showSuccessPopup = false;
          this.router.navigate(['/admin-dashboard']);
        }, 2000);
      },
      error: () => {
        this.errorMsg = 'Failed to add patient.';
      }
    });
  }
}
