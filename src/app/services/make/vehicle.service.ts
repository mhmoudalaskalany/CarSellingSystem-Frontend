import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SaveVehicle } from 'src/app/components/vehicle-form/models/vehicle';
@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private baseUrl = 'https://localhost:44337';
  private vehicleEndpoint = '/api/vehicles';
  private makeEndpoint = '/api/makes';
  private featureEndpoint = '/api/features';
  private modelEndpoint = '/api/models';
  constructor(private http: HttpClient) {}

  getVehicle(id) {
    return this.http.get(this.baseUrl + this.vehicleEndpoint + '/' + id);
  }
  getFeatures() {
    return this.http.get(this.baseUrl + this.featureEndpoint);
  }
  getMakes() {
    return this.http.get(this.baseUrl + this.makeEndpoint);
  }
  getModels() {
    return this.http.get(this.baseUrl + this.modelEndpoint);
  }
  getVehicles(filter) {
    return this.http.get(this.baseUrl + this.vehicleEndpoint + '?' + this.toQueryString(filter));
  }
  create(vehicle) {
    return this.http.post(this.baseUrl + this.vehicleEndpoint, vehicle);
  }
  update(vehicle: SaveVehicle) {
    return this.http.put(this.baseUrl + this.vehicleEndpoint + '/' + vehicle.id , vehicle);
  }
  delete(id) {
    return this.http.delete(this.baseUrl + this.vehicleEndpoint + '/' + id);
  }

  /** private methods */
  toQueryString(obj) {
    const parts = [];
// tslint:disable-next-line: forin
    for (const property in obj) {
      const value = obj[property];
      if (value != null && value !== undefined) {
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
      }
      return parts.join('&');
    }
  }

}
