import { Routes } from '@angular/router';
import { WelcomeComponent } from './auth/components/welcome/welcome.component';  
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';
import { UpdateUserComponent } from './auth/components/update-user/update-user.component';
import { UserListComponent } from './auth/components/user-list/user-list.component';
import { LogoutComponent } from './auth/components/logout/logout.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'update-user', component: UpdateUserComponent },
  { path: 'users', component: UserListComponent },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'profile',
    loadComponent: () =>
      import('./auth/components/user-profile/user-profile.component').then(m => m.UserProfileComponent)
  },
  {
    path: 'admin-dashboard',
    loadComponent: () =>
      import('./auth/components/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
  },
  {
    path: 'doctor-dashboard',
    loadComponent: () =>
      import('./auth/components/doctor-dashboard/doctor-dashboard.component').then(m => m.DoctorDashboardComponent)
  },
  {
    path: 'patient-dashboard',
    loadComponent: () =>
      import('./auth/components/patient-dashboard/patient-dashboard.component').then(m => m.PatientDashboardComponent)
  },
  {
    path: 'update-doctor/:id',
    loadComponent: () =>
      import('./auth/components/update-doctor/update-doctor.component').then(m => m.UpdateDoctorComponent)
  },
  {
    path: 'add-doctor',
    loadComponent: () =>
      import('./auth/components/add-doctor/add-doctor.component').then(m => m.AddDoctorComponent)
  },
  {
    path: 'add-patient',
    loadComponent: () =>
      import('./auth/components/patient/add-patient.component').then(m => m.AddPatientComponent)
  },
  {
    path: 'update-patient/:id',
    loadComponent: () =>
      import('./auth/components/patient/update-patient.component').then(m => m.UpdatePatientComponent)
  },
  {
    path: 'add-appointment',
    loadComponent: () =>
      import('./auth/components/appointment/add-appointment.component').then(m => m.AddAppointmentComponent)
  },
  {
    path: 'update-appointment/:id',
    loadComponent: () =>
      import('./auth/components/appointment/update-appointment.component').then(m => m.UpdateAppointmentComponent)
  },
  {
    path: 'add-billing',
    loadComponent: () =>
      import('./auth/components/billing/add-billing.component').then(m => m.AddBillingComponent)
  },
  {
    path: 'update-billing/:id',
    loadComponent: () =>
      import('./auth/components/billing/update-billing.component').then(m => m.UpdateBillingComponent)
  }
];
