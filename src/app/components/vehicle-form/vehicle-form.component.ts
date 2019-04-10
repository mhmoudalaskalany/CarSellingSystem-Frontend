import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/services/make/vehicle.service';
import { ToastrService } from 'ngx-toastr';
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
    features : [],
    contact : {}
  };
  constructor(
    private vehicleService: VehicleService,
    private toasterService: ToastrService
    ) { }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe((makes: any) => {
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
  onFeatureToggle(id , $event) {
    if ($event.target.checked) {
      this.vehicle.features.push(id);
    } else {
      const index = this.vehicle.features.indexOf(id);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit() {
    this.vehicleService.create(this.vehicle).subscribe((response: any) => {
      console.log(response);
    }, error => {
      this.toasterService.error('unexexted error happend');
    });
  }

}
