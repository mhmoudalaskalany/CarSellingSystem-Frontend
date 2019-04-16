import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/services/make/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    ) {
      this.route.params.subscribe(p => {
        this.vehicle.id = +p['id'];
      });
    }

  ngOnInit() {
    const sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures(),
      this.vehicleService.getVehicle(this.vehicle.id)
    ];
    Observable.forkJoin(sources).subscribe((data) => {
      this.makes = data[0],
      this.features = data[1]
      this.vehicle = data[2]
    }, error => {
      if (error.status === 404) {
        this.router.navigate(['/home']);
      }
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
    });
  }

}
