import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { HomeComponentComponent } from './components/home-component/home-component.component';

const routes: Routes = [
  {path: 'home' , component : HomeComponentComponent},
  {path: 'vehicles/new' , component : VehicleFormComponent},
  {path: 'vehicles/:id' , component : VehicleFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
