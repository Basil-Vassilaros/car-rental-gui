import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarCategory } from '../../models/entity/carCategory.model';

const baseUrl = 'http://localhost:8081/category';

@Injectable({
  providedIn: 'root'
})
export class CarCategoryService {

  constructor(
    private http: HttpClient
  ) { }
  
  getAll(): Observable<CarCategory[]> {
    return this.http.get<CarCategory[]>(`${baseUrl}/all`);
  }

  get(id: any): Observable<CarCategory> {
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

  search(search: any): Observable<CarCategory[]> {
    return this.http.get<CarCategory[]>(`${baseUrl}/search/${search}`);
  }
}
