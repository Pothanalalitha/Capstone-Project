import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService, Patient } from '../../services/patient.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-update-patient',
  imports: [CommonModule, FormsModule],
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent implements OnInit {
  patientId!: number;
  patient: Patient = {
    id: 0,
    name: '',
    address: '',
    gender: '',
    dob: '',
    weight: 0,
    height: 0
  };
  errorMsg: string = '';
  showSuccessPopup: boolean = false;

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.patientId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPatient();
  }

  loadPatient(): void {
    this.patientService.getPatientById(this.patientId).subscribe({
      next: (data) => {
        this.patient = data;
      },
      error: (err) => {
        console.error('Failed to load patient:', err);
      }
    });
  }

  updatePatient(): void {
    this.errorMsg = '';

    if (
      !this.patient.name.trim() ||
      !this.patient.address.trim() ||
      !this.patient.gender.trim() ||
      !this.patient.dob ||
      this.patient.weight <= 0 ||
      this.patient.height <= 0
    ) {
      this.errorMsg = 'All fields are required and must be valid.';
      return;
    }

    const dobDate = new Date(this.patient.dob);
    if (dobDate >= new Date()) {
      this.errorMsg = 'Date of Birth must be in the past.';
      return;
    }

    if (!['Male', 'Female', 'Other'].includes(this.patient.gender)) {
      this.errorMsg = 'Gender must be Male, Female, or Other.';
      return;
    }

    const userId = 'exampleUserId';  // Replace with actual user ID logic

    this.patientService.updatePatient(userId, this.patientId, this.patient).subscribe({
      next: () => {
        this.showSuccessPopup = true;
        setTimeout(() => {
          this.showSuccessPopup = false;
          this.router.navigate(['/admin-dashboard']);
        }, 2000);
      },
      error: () => {
        this.errorMsg = 'Failed to update patient.';
      }
    });
  }
}
