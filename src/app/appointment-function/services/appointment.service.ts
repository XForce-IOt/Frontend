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

  // Create Resource
  create(clinicId:any, vetId: any, appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.basePath}/clinics/${clinicId}/veterinarians/${vetId}/appointments`, appointment);
  }

  delete(clinicId:any, vetId: any, id: any) {
    return this.http.delete(`${this.basePath}/clinics/${clinicId}/veterinarians/${vetId}/appointments/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Update Resource
  update(clinicId:any, vetId: any, id: any, item: any) {
    return this.http.put(`${this.basePath}/clinics/${clinicId}/veterinarians/${vetId}/appointments/${id}`,
      JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get All Resources
  getAll(clinicId:any, vetId: any): Observable<any>  {
    return this.http.get(`${this.basePath}/clinics/${clinicId}/veterinarians/${vetId}/appointments`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAppointmentsById(vetId: any, id: any): Observable<any> {
    return this.http
      .get(`${this.basePath}/${vetId}/appointments/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAppointmentsByPetId(petOwnerId: any,petId: any): Observable<any> {
    return this.http.get(`${this.basePath}/pet-owners/${petOwnerId}/pets/${petId}/appointments`)
      .pipe(retry(2), catchError(this.handleError));
  }
}
