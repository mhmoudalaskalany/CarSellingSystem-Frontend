import * as Raven from 'raven-js';
// importing third parties modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
// importing modules
import { AppRoutingModule } from './app-routing.module';
// importing component
import { AppComponent } from './app.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { AppErrorHandler } from './ErrorHandler/error-handler';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';

Raven.config('https://90ede78f64044181b7b8f6036f64c3c9@sentry.io/1440333').install();
@NgModule({
  declarations: [
    AppComponent,
    VehicleFormComponent,
    HomeComponentComponent,
    VehicleListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule ,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide : ErrorHandler , useClass : AppErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
