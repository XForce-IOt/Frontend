import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {Appointment} from "../model/appointment.model";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  basePath: string = `${environment.baseURL}`;
  resourceEndpoint: string = '/appointments';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    // Default error handling
    if (error.error instanceof ErrorEvent) {
      console.error(`An error occurred: ${error.error.message}`);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.log(`Backend returned core ${error.status}, body was ${error.error}`);
    }
    // Return an observable with a user-facing error message
    return throwError(() => new Error('Something happened with request, please try again later.'));
  }

  private resourcePath(): string {
    return `${this.basePath}${this.resourceEndpoint}`;
  }

  // Create Resource
  create(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.resourcePath(), appointment);
  }

  delete(id: any) {
    return this.http.delete(`${this.resourcePath()}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Update Resource
  update(id: any, item: any) {
    return this.http.put(`${this.resourcePath()}/${id}`,
      JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get All Resources
  getAll(): Observable<any>  {
    return this.http.get(this.resourcePath(), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAppointmentsById(id: any): Observable<any> {
    return this.http
      .get(`${this.resourcePath()}/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAppointmentsByPetId(petId: number): Observable<any> {
    return this.http.get(`${this.resourcePath()}?pet=${petId}`)
      .pipe(retry(2), catchError(this.handleError));
  }
}
