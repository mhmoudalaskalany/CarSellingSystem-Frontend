import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';

const routes: Routes = [
  {path: '' , redirectTo: 'vehicles' , pathMatch : 'full'},
  {path: 'vehicles' , component: VehicleListComponent},
  {path: 'home' , component : HomeComponentComponent},
  {path: 'vehicles/new' , component : VehicleFormComponent},
  {path: 'vehicles/:id' , component : VehicleFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
