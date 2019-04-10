import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private baseUrl = 'https://localhost:44337';
  constructor(private http: HttpClient) {}

  getFeatures() {
    return this.http.get(this.baseUrl + '/api/features');
  }
  getMakes() {
    return this.http.get(this.baseUrl + '/api/makes');
  }
  create(vehicle) {
    return this.http.post(this.baseUrl + '/api/vehicles', vehicle);
  }

}
