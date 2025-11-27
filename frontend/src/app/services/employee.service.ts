import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = environment.apiUrl; // set in environment.ts

  constructor(private http: HttpClient) {}

  searchEmployees(query: {
    firstName?: string;
    lastName?: string;
    position?: string;
    phone?: string;
  }): Observable<Employee[]> {
    let params = new HttpParams();
    if (query.firstName) params = params.set('firstName_like', query.firstName);
    if (query.lastName) params = params.set('lastName_like', query.lastName);
    if (query.position) params = params.set('position_like', query.position);
    if (query.phone) params = params.set('phoneNumbers_like', query.phone);

    return this.http.get<Employee[]>(`${this.baseUrl}/employees`, { params });
  }

  // helper to get all employees
  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/employees`);
  }
}
