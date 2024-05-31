import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {
  constructor(private http: HttpClient) { }

  getCoordinates(address: string): Observable<google.maps.LatLngLiteral> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${environment.googleMapsApiKey}`;
    return this.http.get<any>(url).pipe(
      map(response => response.results[0].geometry.location)
    );
  }
}
