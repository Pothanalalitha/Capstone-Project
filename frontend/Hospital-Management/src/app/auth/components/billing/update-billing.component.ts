import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BillingService, Invoice } from '../../services/billing.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-update-billing',
  imports: [CommonModule, FormsModule],
  templateUrl: './update-billing.component.html',
  styleUrls: ['./update-billing.component.css']
})
export class UpdateBillingComponent implements OnInit {
  invoiceId!: number;
  invoice: Invoice = {
    id: 0,
    appointmentId: 0,
    patientId: 0,
    amount: 0,
    status: '',
    createdAt: '',
    updatedAt: ''
  };
  errorMsg: string = '';
  showSuccessPopup: boolean = false;

  constructor(
    private billingService: BillingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.invoiceId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadInvoice();
  }

  loadInvoice(): void {
    this.billingService.getAllInvoices().subscribe({
      next: (data) => {
        const found = data.find(inv => inv.id === this.invoiceId);
        if (found) {
          this.invoice = found;
        } else {
          this.errorMsg = 'Invoice not found';
        }
      },
      error: (err) => {
        console.error('Failed to load invoice:', err);
      }
    });
  }

  updateInvoice(): void {
    this.errorMsg = '';

    if (
      this.invoice.appointmentId <= 0 ||
      this.invoice.patientId <= 0 ||
      this.invoice.amount <= 0 ||
      !this.invoice.status.trim()
    ) {
      this.errorMsg = 'All fields are required and must be valid.';
      return;
    }

    const userId = 'exampleUserId';  // Replace with actual user ID logic

    // You would need to implement update in billingService if API supports it
    // Example placeholder:
    // this.billingService.updateInvoice(userId, this.invoiceId, this.invoice).subscribe(...);

    // For now, logging and navigating back
    console.log('Update invoice:', this.invoice);
    this.showSuccessPopup = true;
    setTimeout(() => {
      this.showSuccessPopup = false;
      this.router.navigate(['/admin-dashboard']);
    }, 2000);
  }
}
