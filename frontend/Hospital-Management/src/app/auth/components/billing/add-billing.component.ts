import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BillingService, Invoice } from '../../services/billing.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-add-billing',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-billing.component.html',
  styleUrls: ['./add-billing.component.css']
})
export class AddBillingComponent {
  appointmentId: number | null = null;
  patientId: number | null = null;
  amount: number | null = null;
  status: string = '';
  errorMsg: string = '';
  showSuccessPopup: boolean = false;

  constructor(private billingService: BillingService, private router: Router) {}

  addInvoice(): void {
    this.errorMsg = '';

    if (
      this.appointmentId === null ||
      this.patientId === null ||
      this.amount === null ||
      !this.status.trim()
    ) {
      this.errorMsg = 'All fields are required.';
      return;
    }

    const newInvoice: Invoice = {
      id: 0,
      appointmentId: this.appointmentId,
      patientId: this.patientId,
      amount: this.amount,
      status: this.status.trim(),
      createdAt: '',
      updatedAt: ''
    };

    const userId = 'exampleUserId'; // Replace with actual user ID logic

    this.billingService.createInvoice(userId, newInvoice).subscribe({
      next: () => {
        this.showSuccessPopup = true;
        setTimeout(() => {
          this.showSuccessPopup = false;
          this.router.navigate(['/admin-dashboard']);
        }, 2000);
      },
      error: () => {
        this.errorMsg = 'Failed to add invoice.';
      }
    });
  }
}
