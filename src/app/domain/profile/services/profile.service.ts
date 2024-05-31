import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { map, switchMap } from 'rxjs/operators';

import {User} from "src/app/domain/profile/entities/user.model";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = "http://localhost:3000/users"; // URL to web api
  constructor( private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
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

  getList(): Observable<User[]> {
    return this.http
      .get<User[]>(this.baseUrl)
      .pipe(retry(2), catchError(this.handleError));
  }

  createItem(item: any): Observable<User> {
    return this.http
      .post<User>(this.baseUrl, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  //actualizar usuario
  updateItem(item: any): Observable<User> {
    return this.http
      .put<User>(this.baseUrl + '/' + item.id, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
