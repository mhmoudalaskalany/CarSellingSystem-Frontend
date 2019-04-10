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
  vehicle: any = {
    features : []
  };
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
    const selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
    delete this.vehicle.modelId;
  }
  onFeatureToggle(id , $event)
  {
    if ($event.target.checked) {
      this.vehicle.features.push(id);
    } else {
      var index = this.vehicle.features.indexOf(id);
      this.vehicle.features.splice(index, 1);
    }
  }

}
