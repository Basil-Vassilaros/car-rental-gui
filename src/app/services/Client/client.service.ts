import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../models/entity/client.model';

const baseUrl = 'http://localhost:8081/client';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Client[]> {
    return this.http.get<Client[]>(`${baseUrl}/all`);
  }

  get(id: any): Observable<Client> {
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

  search(search: any): Observable<Client[]> {
    return this.http.get<Client[]>(`${baseUrl}/search/${search}`);
  }
}
