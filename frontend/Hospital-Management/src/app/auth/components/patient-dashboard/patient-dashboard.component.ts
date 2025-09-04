import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingService, Invoice } from '../../services/billing.service';
import { AddAppointmentComponent } from '../appointment/add-appointment.component';

@Component({
  standalone: true,
  selector: 'app-patient-dashboard',
  imports: [CommonModule, AddAppointmentComponent],
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {
  currentView: string = 'billing'; // default
  currentViewTitle: string = 'Billing Details';

  bills: Invoice[] = [];

  constructor(private billingService: BillingService) {}

  ngOnInit(): void {
    this.loadBills();
  }

  loadBills(): void {
    this.billingService.getAllInvoices().subscribe({
      next: (data) => this.bills = data,
      error: (err) => console.error('Failed to load billing details', err)
    });
  }

  selectView(view: string): void {
    this.currentView = view;
    switch(view) {
      case 'billing':
        this.currentViewTitle = 'Billing Details';
        this.loadBills();
        break;
      case 'createAppointment':
        this.currentViewTitle = 'Create Appointment';
        break;
    }
  }
}
