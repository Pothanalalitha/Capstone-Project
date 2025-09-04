import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Patient {
  id: number;
  name: string;
  address: string;
  gender: string;
  dob: string; // ISO date string
  weight: number;
  height: number;
}

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private baseUrl = 'http://localhost:8081/api/patients';

  constructor(private http: HttpClient) {}

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.baseUrl}/getAllPatient`);
  }

  getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.baseUrl}/getPatientById/${id}`);
  }

  createPatient(userId: string, patient: Patient): Observable<Patient> {
    const params = new HttpParams().set('userId', userId);
    return this.http.post<Patient>(`${this.baseUrl}/createPatient`, patient, { params });
  }

  updatePatient(userId: string, id: number, patient: Patient): Observable<Patient> {
    const params = new HttpParams().set('userId', userId);
    return this.http.patch<Patient>(`${this.baseUrl}/updatePatientById/${id}`, patient, { params });
  }

  deletePatient(userId: string, id: number): Observable<string> {
    const params = new HttpParams().set('userId', userId);
    return this.http.delete(`${this.baseUrl}/deletePatientById/${id}`, {
      params,
      responseType: 'text'
    });
  }
}
