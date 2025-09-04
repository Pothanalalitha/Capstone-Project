import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

import { AdminDashboardComponent } from './auth/components/admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [
    AdminDashboardComponent, // Declare the AdminDashboardComponent here
    // Declare other components here as needed
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: [/* Your root component, usually AppComponent */]
})
export class AppModule {}
