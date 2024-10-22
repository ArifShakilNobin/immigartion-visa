import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { applicationUrls } from 'src/app/shared/application-constants/application-urls.const';
import { HttpErrorHandler } from 'src/app/shared/services/http-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(
    private httpClient: HttpClient,
    private httpErrorHandler: HttpErrorHandler,
    private router: Router
  ) {}

  test(): Observable<any> {
    return this.httpClient.get<any>(applicationUrls.test.getTest).pipe(
      tap((response) => {
        if (response && response.success && response.data) {
          console.log(response.data);
        } else {
          console.error('Token not found in the response');
        }
      })
    );

  }


}
