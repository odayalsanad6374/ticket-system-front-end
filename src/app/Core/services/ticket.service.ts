import {
  HttpClient,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private environment = environment;
  private http = inject(HttpClient);
  private readonly userKey = 'currentUser';

  getUser() {
    return  JSON.parse(localStorage.getItem(this.userKey)!);
  }

  getTickets(filter: any): Observable<any> {
    if (this.getUser()?.roleId == 2) {
      filter.technicianId = this.getUser().id;
    }

    const params = new HttpParams({ fromObject: this.cleanFilter(filter) });
    const url = `${this.environment.apiUrl}/Ticket`;
    return this.http.get<any>(url, { params });
  }

  private cleanFilter(filter: any): any {
    // Remove undefined or null values
    const cleaned: any = {};
    Object.keys(filter).forEach((key) => {
      if (
        filter[key] !== null &&
        filter[key] !== '' &&
        filter[key] !== undefined
      ) {
        cleaned[key] = filter[key];
      }
    });
    return cleaned;
  }

  getTechnicianUsers(): Observable<any> {
    const params = new HttpParams({ fromObject: { roleId: 2 } });
    const url = `${this.environment.apiUrl}/User`;
    return this.http.get<any>(url, { params });
  }

  getCustomers(): Observable<any> {
    const url = `${this.environment.apiUrl}/Customer`;
    return this.http.get<any>(url);
  }

  getTicketById(id: number): Observable<any> {
    const params = new HttpParams({ fromObject: { id: id } });
    const url = `${this.environment.apiUrl}/Ticket/view`;
    return this.http.get<any>(url, { params });
  }
}
