import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/services/make/vehicle.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss']
})
export class VehicleFormComponent implements OnInit {

  makes: any[];
  models: any[];
  features: any[];
  vechile: any = {};
  constructor(
    private vehicleService: VehicleService,
    ) { }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe((makes: any) =>{
      this.makes = makes;
    });
    this.vehicleService.getFeatures().subscribe((features: any) => {
      this.features = features;
    });
  }

  onMakeChange() {
    // tslint:disable-next-line:triple-equals
    const selectedMake = this.makes.find(m => m.id == this.vechile.make);
    this.models = selectedMake ? selectedMake.models : [];
  }

}
