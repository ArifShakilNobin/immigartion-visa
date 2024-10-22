import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GeoService {
  private geoApiUrl = 'https://ipinfo.io/json'; // IPinfo.io API

  constructor(private http: HttpClient) {}

  getGeoInfo(): Observable<GeoInfoResponse> {
    return this.http.get<GeoInfoResponse>(this.geoApiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching geo information:', error);
        throw new Error('Failed to fetch geo information');
      })
    );
  }
}

export interface GeoInfoResponse {
  ip: string;
  country: string;
  city: string;
  region: string;
  loc: string; // Latitude and longitude
  org: string; // Organization
  postal: string; // Postal code
  timezone: string;
}
