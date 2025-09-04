import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Appointment {
  id: number;
  patientId: number;
  doctorId: number;
  appointmentTime: string; // ISO string datetime
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private baseUrl = 'http://localhost:8083/api/appointments';

  constructor(private http: HttpClient) {}

  getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/getAllAppointments`);
  }

  getAppointmentById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.baseUrl}/getAppointmentById/${id}`);
  }

  createAppointment(userId: string, appointment: Appointment): Observable<Appointment> {
    const params = new HttpParams().set('userId', userId);
    return this.http.post<Appointment>(`${this.baseUrl}/createAppointment`, appointment, { params });
  }

  updateAppointment(userId: string, id: number, appointment: Appointment): Observable<Appointment> {
    const params = new HttpParams().set('userId', userId);
    return this.http.put<Appointment>(`${this.baseUrl}/updateAppointmentById/${id}`, appointment, { params });
  }

  deleteAppointment(userId: string, id: number): Observable<string> {
    const params = new HttpParams().set('userId', userId);
    return this.http.delete(`${this.baseUrl}/deleteAppointment/${id}`, {
      params,
      responseType: 'text'
    });
  }
}
