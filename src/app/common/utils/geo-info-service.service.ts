import { Injectable } from '@angular/core';
import { GeoService, GeoInfoResponse } from './geo.service'; // Adjust import path if necessary
import { ReplaySubject, Observable, tap } from 'rxjs';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeoInfoService {
  public ipSubject = new BehaviorSubject<string | null>(null);
  public countrySubject = new BehaviorSubject<string | null>(null);

  constructor(private geoService: GeoService) {}

  loadGeoInfo(): Observable<GeoInfoResponse> {
    return this.geoService.getGeoInfo().pipe(
      tap({
        next: (data: GeoInfoResponse) => {
          this.ipSubject.next(data.ip);
          this.countrySubject.next(data.country);
        },
        error: (error) => {
          console.error('Error loading geo info:', error);
          this.ipSubject.next(null);
          this.countrySubject.next(null);
        },
      })
    );
  }

  getIp(): string | null {
    return this.ipSubject.value;
  }

  getCountry(): string | null {
    return this.countrySubject.value;
  }
}
