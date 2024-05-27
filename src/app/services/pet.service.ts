import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private baseUrl:string = environment.baseURL;

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

  getPets(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pets`);
  }

  getPetById(id: any): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/pets/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  updatePet(id: any, item: any) {
    return this.http
      .put(`${this.baseUrl}/pets/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
