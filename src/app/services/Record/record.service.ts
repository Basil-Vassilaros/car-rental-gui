import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RentalRecord } from '../../models/entity/rentalRecord.model';

const baseUrl = 'http://localhost:8081/reservation';

@Injectable({
  providedIn: 'root'
})
export class RecordService {


  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<RentalRecord[]> {
    return this.http.get<RentalRecord[]>(`${baseUrl}/all`);
  }

  get(id: any): Observable<RentalRecord> {
    return this.http.get(`${baseUrl}/details/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/add`, data, {responseType: 'text'});
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/update/${id}`, data,  {responseType: 'text'});
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/remove/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  search(search: any): Observable<RentalRecord[]> {
    return this.http.get<RentalRecord[]>(`${baseUrl}/search/${search}`);
  }
}
