import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { SensorData } from '../model/sensor-data.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private baseUrl:string = `${environment.baseURL}/pet-owners`;

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
    })
  }

  handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.log(
        `An error occurred ${error.status}, body was: ${error.error}`
      );
    } else {
      console.log(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError(
      'Something happened with request, please try again later.'
    );
  }

  getPets(petOwnerId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${petOwnerId}/pets`);
  }

  getPetById(petOwnerId: any, petId: any): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/${petOwnerId}/pets/${petId}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  updatePet(petOwnerId: any, petId: any, item: any): Observable<any> {
    return this.http
      .put(`${this.baseUrl}/${petOwnerId}/pets/${petId}`,JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getPetMetrics(petId: number): Observable<SensorData[]> {
    return this.http.get<SensorData[]>(`${this.baseUrl}/${petId}/sensorData`);
  }
}
