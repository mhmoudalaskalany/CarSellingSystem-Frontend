import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SaveVehicle } from 'src/app/components/vehicle-form/models/vehicle';
@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private baseUrl = 'https://localhost:44337';
  constructor(private http: HttpClient) {}

  getVehicle(id)
  {
    return this.http.get(this.baseUrl + '/api/vehicles/' + id);
  }
  getFeatures() {
    return this.http.get(this.baseUrl + '/api/features');
  }
  getMakes() {
    return this.http.get(this.baseUrl + '/api/makes');
  }
  getVehicles() {
    return this.http.get(this.baseUrl + '/api/vehicles');
  }
  create(vehicle) {
    return this.http.post(this.baseUrl + '/api/vehicles', vehicle);
  }
  update(vehicle: SaveVehicle) {
    return this.http.put(this.baseUrl + '/api/vehicles/' + vehicle.id , vehicle);
  }
  delete(id) {
    return this.http.delete(this.baseUrl + '/api/vehicles/' + id);
  }

}
