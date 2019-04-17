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
  filter: any = {};
  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.getMakesAndVehicles()
      .subscribe((data: any) => {
        this.vehicles = data[0];
        this.makes = data[1];
      });
  }

  private getMakesAndVehicles() {
    const sources = [
      this.vehicleService.getVehicles(),
      this.vehicleService.getMakes()
    ];
    return forkJoin(sources);
  }
  onFilterChange() {
    return this.filter.makeId;
  }
}
