import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Doctor, DoctorService } from '../../services/doctor.service';
import { Patient, PatientService } from '../../services/patient.service';
import { Appointment, AppointmentService } from '../../services/appointment.service';
import { Invoice, BillingService } from '../../services/billing.service';

@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  currentView: string = 'doctors'; // default view
  currentViewTitle: string = 'Doctors Information';

  doctors: Doctor[] = [];
  patients: Patient[] = [];
  appointments: Appointment[] = [];
  bills: Invoice[] = [];

  deleteSuccess: boolean = false;
  patientDeleteSuccess: boolean = false;
  appointmentDeleteSuccess: boolean = false;
  billingDeleteSuccess: boolean = false;

  constructor(
    private doctorService: DoctorService,
    private patientService: PatientService,
    private appointmentService: AppointmentService,
    private billingService: BillingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.doctorService.getAllDoctors().subscribe({
      next: (data: Doctor[]) => this.doctors = data,
      error: (err) => console.error('Failed to load doctors:', err)
    });
  }

  loadPatients(): void {
    this.patientService.getAllPatients().subscribe({
      next: (data: Patient[]) => this.patients = data,
      error: (err) => console.error('Failed to load patients:', err)
    });
  }

  loadAppointments(): void {
    this.appointmentService.getAllAppointments().subscribe({
      next: (data: Appointment[]) => this.appointments = data,
      error: (err) => console.error('Failed to load appointments:', err)
    });
  }

  loadBillings(): void {
    this.billingService.getAllInvoices().subscribe({
      next: (data: Invoice[]) => this.bills = data,
      error: (err) => console.error('Failed to load billings:', err)
    });
  }

  selectView(view: string): void {
    if (view === 'patients') {
      const addPatientConfirmed = confirm('Do you want to add a new patient?');
      if (addPatientConfirmed) {
        this.router.navigate(['/add-patient']);
        return; // skip loading patients initially since redirecting
      }
    }

    this.currentView = view;

    switch(view) {
      case 'doctors':
        this.currentViewTitle = 'Doctors Information';
        this.loadDoctors();
        break;
      case 'patients':
        this.currentViewTitle = 'Patients Information';
        this.loadPatients();
        break;
      case 'appointments':
        this.currentViewTitle = 'Appointments Information';
        this.loadAppointments();
        break;
      case 'billing':
        this.currentViewTitle = 'Billing Information';
        this.loadBillings();
        break;
      default:
        this.currentViewTitle = '';
    }
  }

  onDoctorsInfoClick(): void {
    const addDoctorConfirmed = confirm('Do you want to add a new doctor?');
    if (addDoctorConfirmed) {
      this.router.navigate(['/add-doctor']);
    } else {
      this.selectView('doctors');
    }
  }

  editDoctor(doc: Doctor): void {
    this.router.navigate(['/update-doctor', doc.id]);
  }

  deleteDoctor(doc: Doctor): void {
    const userId = 'exampleUserId'; // Replace with actual logged-in user id

    this.doctorService.deleteDoctor(userId, doc.id).subscribe({
      next: () => {
        this.showDeleteSuccessPopup();
        this.loadDoctors();
      },
      error: (err) => {
        console.error('Delete failed', err);
      }
    });
  }

  editPatient(patient: Patient): void {
    this.router.navigate(['/update-patient', patient.id]);
  }

  deletePatient(patient: Patient): void {
    const userId = 'exampleUserId'; // Replace with actual logged-in user id

    if (confirm(`Are you sure you want to delete patient '${patient.name}'?`)) {
      this.patientService.deletePatient(userId, patient.id).subscribe({
        next: () => {
          this.patientDeleteSuccess = true;
          this.loadPatients();
          setTimeout(() => this.patientDeleteSuccess = false, 2000);
        },
        error: (err) => {
          console.error('Delete failed', err);
        }
      });
    }
  }

  editAppointment(appointment: Appointment): void {
    this.router.navigate(['/update-appointment', appointment.id]);
  }

  deleteAppointment(appointment: Appointment): void {
    const userId = 'exampleUserId'; // Replace with actual logged-in user id

    if (confirm(`Are you sure you want to delete this appointment?`)) {
      this.appointmentService.deleteAppointment(userId, appointment.id).subscribe({
        next: () => {
          this.appointmentDeleteSuccess = true;
          this.loadAppointments();
          setTimeout(() => this.appointmentDeleteSuccess = false, 2000);
        },
        error: (err) => {
          console.error('Delete failed', err);
        }
      });
    }
  }

  editBilling(bill: Invoice): void {
    this.router.navigate(['/update-billing', bill.id]);
  }

  deleteBilling(bill: Invoice): void {
    const userId = 'exampleUserId'; // Replace with actual logged-in user id

    if (confirm(`Are you sure you want to delete this billing invoice?`)) {
      // Implement billing delete method in billingService if supported
      // As example, assuming it's implemented:
      this.billingService.deleteInvoice(userId, bill.id).subscribe({
        next: () => {
          this.billingDeleteSuccess = true;
          this.loadBillings();
          setTimeout(() => this.billingDeleteSuccess = false, 2000);
        },
        error: (err: any) => {
          console.error('Delete failed', err);
        }
      });
    }
  }

  showDeleteSuccessPopup(): void {
    this.deleteSuccess = true;
    setTimeout(() => this.deleteSuccess = false, 3000);
  }
}
