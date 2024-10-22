import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeoInfoService } from './geo-info-service.service';

@Injectable()
export class GeoInterceptor implements HttpInterceptor {
  constructor(private geoInfoService: GeoInfoService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const ip = this.geoInfoService.getIp();
    const country = this.geoInfoService.getCountry();

    let headers = req.headers;
    if (ip) {
      headers = headers.append('Client-IP', ip);
    }
    if (country) {
      headers = headers.append('Client-Country', country);
    }

    const modifiedReq = req.clone({ headers
    });

    return next.handle(modifiedReq);
  }
}
