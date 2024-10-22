import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, switchMap, tap } from 'rxjs';
import { applicationUrls } from 'src/app/shared/application-constants/application-urls.const';
import {  ServerResponse } from 'src/app/shared/models/dto/server-response.dto';
import {
  ErrorHandler,
  HttpErrorHandler,
} from 'src/app/shared/services/http-error-handler.service';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { GeoInfoResponse, GeoService } from 'src/app/common/utils/geo.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationStorageService {
  private handleError: ErrorHandler;
  constructor(
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService,
    // private authorizationService: AuthorizationService,
    private httpErrorHandler: HttpErrorHandler,
    private router: Router,
    private geoService: GeoService
  ) {
    this.handleError = this.httpErrorHandler.createErrorHandler(
      'Authentication Service'
    );
  }

  registration(userLoginCredential: any): Observable<ServerResponse> {
    return this.httpClient.post<any>(applicationUrls.user.register, userLoginCredential).pipe(
      tap(response => {
        if (response && response.success && response.data) {
          this.router.navigate(['#']);
        } else {
          console.error('Token not found in the response');
        }
      })
    );
  }

  login(credentials: any): Observable<any> {
    return this.httpClient.post<any>(applicationUrls.user.login, credentials).pipe(
      tap(response => {
        if (response && response.success && response.data) {
          localStorage.setItem('token', response.data);  // Store the JWT token directly
        } else {
          console.error('Token not found in the response');
        }
      })
    );
}


// login(credentials: any): Observable<any> {
//   return this.geoService.getGeoInfo().pipe(
//     switchMap((geoInfo: GeoInfoResponse) => {
//       const clientIp = geoInfo.ip;
//       const clientCountry = geoInfo.country;

//       const headers = {
//         'Client-IP': clientIp,
//         'Client-Country': clientCountry
//       };

//       return this.httpClient.post<any>(applicationUrls.user.login, credentials, { headers });
//     }),
//     tap(response => {
//       if (response && response.success && response.data) {
//         localStorage.setItem('token', response.data);  // Store the JWT token directly
//       } else {
//         console.error('Token not found in the response');
//       }
//     })
//   );
// }


  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }


}
