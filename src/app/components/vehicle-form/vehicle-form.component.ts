import * as _ from 'underscore';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/services/make/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Vehicle, SaveVehicle } from './models/vehicle';
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
  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    features: [],
    contact: {
      name: '',
      phone: '',
      email: ''
    },
    isRegistered: false

  };
  constructor(
    private toastService: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
  ) {
    this.route.params.subscribe(p => {
      this.vehicle.id = +p['id'];
    });
  }

  ngOnInit() {
    this.getVehicleData().subscribe((data: any) => {
      this.makes = data[0];
      this.features = data[1];
      if (this.vehicle.id) {
        this.setVehicle(data[2]);
        this.populateModels();
      }
    }, error => {
      if (error.status === 404) {
        this.toastService.error('Vehicle Not Found');
        this.router.navigate(['/home']);
      }
    });
  }

  private setVehicle(v: Vehicle) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = _.pluck(v.features, 'id');
  }
  getVehicleData() {
    const sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures()
    ];
    if (this.vehicle.id) {
      sources.push(this.vehicleService.getVehicle(this.vehicle.id));
    }
    return forkJoin(sources);
  }
  onMakeChange() {
    // tslint:disable-next-line:triple-equals
    this.populateModels();
    delete this.vehicle.modelId;
  }

  private populateModels() {
    const selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }
  onFeatureToggle(id, $event) {
    if ($event.target.checked) {
      this.vehicle.features.push(id);
    } else {
      const index = this.vehicle.features.indexOf(id);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit() {
    if (this.vehicle.id) {
      this.vehicleService.update(this.vehicle).subscribe((data) => {
        this.toastService.success('Vehicle Updated Successfully');
      });
    } else {
      this.vehicleService.create(this.vehicle).subscribe((response: any) => {
        console.log(response);
      });
    }
  }
  delete() {
    if (confirm('are you sure')) {
      this.vehicleService.delete(this.vehicle.id).subscribe((data) => {
        this.toastService.warning('Vehicle Deleted Successfully');
        this.router.navigate(['/home']);
      });
    }
  }
}
