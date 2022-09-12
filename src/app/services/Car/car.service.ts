import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../../models/entity/car.model';

const baseUrl = 'http://localhost:8081/cars';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Car[]> {
    return this.http.get<Car[]>(`${baseUrl}/all`);
  }

  get(id: any): Observable<Car> {
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

  search(search: any): Observable<Car[]> {
    return this.http.get<Car[]>(`${baseUrl}/search/${search}`);
  }
}
