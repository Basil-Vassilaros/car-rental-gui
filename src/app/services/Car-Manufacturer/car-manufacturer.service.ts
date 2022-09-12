import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarManufacturer } from '../../models/entity/carManufacturer.model';

const baseUrl = 'http://localhost:8081/manufacturer';

@Injectable({
  providedIn: 'root'
})
export class CarManufacturerService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<CarManufacturer[]> {
    return this.http.get<CarManufacturer[]>(`${baseUrl}/all`);
  }

  get(id: any): Observable<CarManufacturer> {
    return this.http.get(`${baseUrl}/details/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/add`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/update/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  search(search: any): Observable<CarManufacturer[]> {
    return this.http.get<CarManufacturer[]>(`${baseUrl}/search/${search}`);
  }
}
