import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Patient, PatientService } from '../../services/patient.service';
import { Appointment, AppointmentService } from '../../services/appointment.service';

@Component({
  standalone: true,
  selector: 'app-doctor-dashboard',
  imports: [CommonModule],
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
  currentView: string = 'patients'; // default
  currentViewTitle: string = 'Patients List';

  patients: Patient[] = [];
  appointments: Appointment[] = [];

  constructor(
    private patientService: PatientService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getAllPatients().subscribe({
      next: data => this.patients = data,
      error: err => console.error('Failed to load patients', err)
    });
  }

  loadAppointments(): void {
    this.appointmentService.getAllAppointments().subscribe({
      next: data => this.appointments = data,
      error: err => console.error('Failed to load appointments', err)
    });
  }

  selectView(view: string): void {
    this.currentView = view;
    switch(view) {
      case 'patients':
        this.currentViewTitle = 'Patients List';
        this.loadPatients();
        break;
      case 'appointments':
        this.currentViewTitle = 'Appointments List';
        this.loadAppointments();
        break;
    }
  }
}
