import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private baseUrl = 'http://localhost:8082/api/doctors';

  constructor(private http: HttpClient) {}

  getAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.baseUrl}/getAlldoctors`);
  }

  getDoctorById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.baseUrl}/getDoctorById/${id}`);
  }

  createDoctor(userId: string, doctor: Doctor): Observable<Doctor> {
    const params = new HttpParams().set('userId', userId);
    return this.http.post<Doctor>(`${this.baseUrl}/createDoctor`, doctor, { params });
  }

  updateDoctor(userId: string, id: number, doctor: Doctor): Observable<Doctor> {
    const params = new HttpParams().set('userId', userId);
    return this.http.put<Doctor>(`${this.baseUrl}/updateDoctorById/${id}`, doctor, { params });
  }

  deleteDoctor(userId: string, id: number): Observable<string> {
    const params = new HttpParams().set('userId', userId);
    return this.http.delete(`${this.baseUrl}/DeleteDoctorById/${id}`, {
      params,
      responseType: 'text'
    });
  }
}
