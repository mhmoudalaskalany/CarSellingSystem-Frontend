import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/services/make/vehicle.service';
import { Vehicle } from '../vehicle-form/models/vehicle';
import { KeyValuePair } from './../vehicle-form/models/vehicle';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];
  makes: KeyValuePair[];
  models: KeyValuePair[];
  filter: any = {};
  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.getMakesAndModels().subscribe((data: any) => {
      this.makes = data[0];
      this.models = data[1];
    });
    this.populateVehicles();
  }
  private getMakesAndModels() {
    const sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getModels()
    ];
    return forkJoin(sources);
  }
  private populateVehicles() {
    this.vehicleService.getVehicles(this.filter).subscribe((vehicles: Vehicle[]) => {
      this.vehicles = vehicles;
    });
  }
  onFilterChange() {
    this.populateVehicles();
  }
}
