import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService, Appointment } from '../../services/appointment.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-update-appointment',
  imports: [CommonModule, FormsModule],
  templateUrl: './update-appointment.component.html',
  styleUrls: ['./update-appointment.component.css']
})
export class UpdateAppointmentComponent implements OnInit {
  appointmentId!: number;
  appointment: Appointment = {
    id: 0,
    patientId: 0,
    doctorId: 0,
    appointmentTime: '',
    status: ''
  };
  errorMsg: string = '';
  showSuccessPopup: boolean = false;

  constructor(
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.appointmentId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadAppointment();
  }

  loadAppointment(): void {
    this.appointmentService.getAppointmentById(this.appointmentId).subscribe({
      next: (data) => {
        this.appointment = data;
      },
      error: (err) => {
        console.error('Failed to load appointment:', err);
      }
    });
  }

  updateAppointment(): void {
    this.errorMsg = '';

    if (
      this.appointment.patientId <= 0 ||
      this.appointment.doctorId <= 0 ||
      !this.appointment.appointmentTime ||
      !this.appointment.status.trim()
    ) {
      this.errorMsg = 'All fields are required and must be valid.';
      return;
    }

    const userId = 'exampleUserId';  // Replace with actual user ID logic

    this.appointmentService.updateAppointment(userId, this.appointmentId, this.appointment).subscribe({
      next: () => {
        this.showSuccessPopup = true;
        setTimeout(() => {
          this.showSuccessPopup = false;
          this.router.navigate(['/admin-dashboard']);
        }, 2000);
      },
      error: () => {
        this.errorMsg = 'Failed to update appointment.';
      }
    });
  }
}
