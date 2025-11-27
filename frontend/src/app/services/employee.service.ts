import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Employee } from '../models/employee.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = environment.apiUrl; // http://localhost:3000

  constructor(private http: HttpClient) {}

  /** normalize phone: remove non-digit characters and leading country zeros if needed */
  private normalizePhone(phone: string | undefined | null): string {
    if (!phone) return '';
    // remove everything except digits
    const digits = phone.replace(/\D/g, '');
    return digits;
  }

  /**
   * Smart phone match:
   * - If queryPhone is shorter than 6-7 digits, we match by last N digits
   * - Otherwise check includes (partial) in normalized phone
   */
  private phoneMatches(employeePhones: string[] | undefined, queryPhone: string | undefined): boolean {
    if (!queryPhone || !queryPhone.toString().trim()) return true; // no phone filter -> match
    const q = this.normalizePhone(queryPhone.toString());
    if (!q) return true;

    if (!employeePhones || employeePhones.length === 0) return false;

    // If user types few digits (<=6), match against last N digits
    const threshold = 6;
    const useLastN = q.length <= threshold;

    return employeePhones.some(ph => {
      const p = this.normalizePhone(ph);
      if (!p) return false;

      if (useLastN) {
        // match last q.length digits
        return p.endsWith(q);
      } else {
        // partial match anywhere
        return p.includes(q);
      }
    });
  }

  /**
   * Search employees with client-side filtering for robust phone matching.
   * - We fetch all employees from json-server and filter in-app.
   * - For very large datasets you'd implement server-side search, but for this assignment this is fine.
   */
  searchEmployees(query: {
    firstName?: string;
    lastName?: string;
    position?: string;
    phone?: string;
  }): Observable<Employee[]> {
    // Safe: fetch all and filter locally for consistency and robust phone handling
    return this.http.get<Employee[]>(`${this.baseUrl}/employees`).pipe(
      map(list => {
        const qFirst = query.firstName?.toString().trim().toLowerCase() || '';
        const qLast = query.lastName?.toString().trim().toLowerCase() || '';
        const qPosition = query.position?.toString().trim().toLowerCase() || '';
        const qPhone = query.phone?.toString().trim() || '';

        // If no filters, return full list early
        const hasAny = !!(qFirst || qLast || qPosition || qPhone);
        if (!hasAny) return list;

        return list.filter(emp => {
          // name checks (case-insensitive, partial)
          const firstOk = !qFirst || (emp.firstName || '').toLowerCase().includes(qFirst);
          const lastOk = !qLast || (emp.lastName || '').toLowerCase().includes(qLast);
          const positionOk = !qPosition || (emp.position || '').toLowerCase().includes(qPosition);

          // phone check uses smart function above
          const phoneOk = this.phoneMatches(emp.phoneNumbers, qPhone);

          return firstOk && lastOk && positionOk && phoneOk;
        });
      })
    );
  }

  // helper to get all employees (used by app.component for initial load)
  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/employees`);
  }
}
