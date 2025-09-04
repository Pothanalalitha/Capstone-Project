import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideRouter } from '@angular/router';   // import provideRouter
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';  // <-- Import provideHttpClient

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideRouter(routes),   // register routes here
    provideHttpClient(),     // <-- Add this line to provide HttpClient service
  ]
}).catch((err) => console.error(err));
