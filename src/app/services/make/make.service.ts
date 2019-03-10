import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MakeService {
  private baseUrl = 'http://localhost:5000';
  constructor(private http: HttpClient) {}

  getMakes() {
    return this.http.get(this.baseUrl + '/api/makes');
  }
}
