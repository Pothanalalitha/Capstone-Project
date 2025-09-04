import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppointmentService, Appointment } from '../../services/appointment.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-add-appointment',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent {
  patientId: number | null = null;
  doctorId: number | null = null;
  appointmentTime: string = '';
  status: string = '';
  errorMsg: string = '';
  showSuccessPopup: boolean = false;

  constructor(private appointmentService: AppointmentService, private router: Router) {}

  addAppointment(): void {
    this.errorMsg = '';

    if (
      this.patientId === null ||
      this.doctorId === null ||
      !this.appointmentTime ||
      !this.status.trim()
    ) {
      this.errorMsg = 'All fields are required.';
      return;
    }

    const newAppointment: Appointment = {
      id: 0,
      patientId: this.patientId,
      doctorId: this.doctorId,
      appointmentTime: this.appointmentTime,
      status: this.status.trim()
    };

    const userId = 'exampleUserId';  // Replace with actual user ID logic

    this.appointmentService.createAppointment(userId, newAppointment).subscribe({
      next: () => {
        this.showSuccessPopup = true;
        setTimeout(() => {
          this.showSuccessPopup = false;
          this.router.navigate(['/admin-dashboard']);
        }, 2000);
      },
      error: () => {
        this.errorMsg = 'Failed to add appointment.';
      }
    });
  }
}
