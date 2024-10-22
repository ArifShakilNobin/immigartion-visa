import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';
import { AuthenticationStorageService } from 'src/app/modules/authentication/services/authentication-storage.service';
import { GeoInfoService } from 'src/app/common/utils/geo-info-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthenticationService,
    private authStorageService: AuthenticationStorageService,
    private geoInfoService: GeoInfoService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authToken = this.authStorageService.getToken();
    if (authToken) {
      const authReq = req.clone({
        setHeaders: { Authorization: 'Bearer ' + authToken },
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }

  // intercept(req: HttpRequest<any>, next: HttpHandler) {
  //   const token = localStorage.getItem('token');
  //   const ip = this.geoInfoService.getIp();
  //   const country = this.geoInfoService.getCountry();

  //   let headers = req.headers;

  //   if (token) {
  //     headers = headers.append('Authorization', `Bearer ${token}`);
  //   }
  //   if (ip && country) {
  //     headers = headers.append('Client-IP', ip);
  //     headers = headers.append('Client-Country', country);
  //   }

  //   const modifiedReq = req.clone({ headers });
  //   return next.handle(modifiedReq);
  // }
}
