import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarModel } from '../../models/entity/carModel.model';

const baseUrl = 'http://localhost:8081/model';

@Injectable({
  providedIn: 'root'
})
export class CarModelService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<CarModel[]> {
    return this.http.get<CarModel[]>(`${baseUrl}/all`);
  }

  get(id: any): Observable<CarModel> {
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

  search(searchPhrase: any): Observable<CarModel[]> {
    return this.http.get<CarModel[]>(`${baseUrl}/search/${searchPhrase}`);
  }
}
