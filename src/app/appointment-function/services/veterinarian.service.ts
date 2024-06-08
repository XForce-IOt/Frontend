import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class VeterinarianService {
  baseUrl: string = `${environment.baseURL}/clinics`;

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
  create(clinicId: any, item: any) {
    return this.http.post(`${this.baseUrl}/${clinicId}/veterinarians`,
      JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  delete(clinicId: any, id: any) {
    return this.http.delete(`${this.baseUrl}/${clinicId}/veterinarians/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Update Resource
  update(clinicId: any, id: any, item: any) {
    return this.http.put(`${this.baseUrl}/${clinicId}/veterinarians/${id}`,
      JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get All Resources
  getAll(clinicId: any): Observable<any>  {
    return this.http.get(`${this.baseUrl}/${clinicId}/veterinarians`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  /*getVeterinarianByClinicId(clinicId: number): Observable<any>  {
    return this.http.get(`${this.resourcePath()}?clinic=${clinicId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }*/
}
