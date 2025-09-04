import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Invoice {
  id: number;
  appointmentId: number;
  patientId: number;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  private baseUrl = 'http://localhost:8084/api/billing';

  constructor(private http: HttpClient) {}

  getAllInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.baseUrl}/getAllInvoices`);
  }

  createInvoice(userId: string, invoice: Invoice): Observable<Invoice> {
    const params = new HttpParams().set('userId', userId);
    return this.http.post<Invoice>(`${this.baseUrl}/createInvoices`, invoice, { params });
  }

  deleteInvoice(userId: string, id: number): Observable<string> {
    const params = new HttpParams().set('userId', userId);
    return this.http.delete(`${this.baseUrl}/deleteInvoice/${id}`, {
      params,
      responseType: 'text'
    });
  }
}
