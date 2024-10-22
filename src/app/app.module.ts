import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  HTTP_INTERCEPTORS,
  HttpBackend,
  HttpRequest,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';
import {
  NgxUiLoaderConfig,
  POSITION,
  SPINNER,
  NgxUiLoaderHttpConfig,
  NgxUiLoaderModule,
  NgxUiLoaderRouterModule,
  NgxUiLoaderHttpModule,
} from 'ngx-ui-loader';
import { IconsProviderModule } from './icons-provider.module';
import { CoreModule } from './core/core.module';
import { LandingModule } from './modules/landing/landing.module';
import { SharedModule } from './shared/modules/shared/shared.module';
import { lastValueFrom, tap } from 'rxjs';
import { GeoInfoService } from './common/utils/geo-info-service.service';
import { GeoInterceptor } from './common/utils/GeoInterceptor';
import { AuthInterceptor } from './shared/services/http-interceptors/auth-interceptor';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'red',
  bgsPosition: POSITION.centerCenter,
  bgsSize: 40,
  bgsType: SPINNER.rectangleBounce, // background spinner type
  // fgsType: SPINNER.chasingDots, // foreground spinner type
  // pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  // pbThickness: 5, // progress bar thickness
};

const ngxUiLoaderHttpConfig: NgxUiLoaderHttpConfig = {
  // showForeground: true,
};

registerLocaleData(en);

const ngZorroConfig: NzConfig = {
  notification: { nzPlacement: 'topRight' },
};

export function appInitializer(geoInfoService: GeoInfoService, http: HttpBackend) {
  return () => {
    return lastValueFrom(
      http.handle(new HttpRequest('GET', 'https://ipinfo.io/json')).pipe(
        tap({
          next: (response: any) => {
            if (response.body && typeof response.body === 'object' &&'ip' in response.body && 'country' in response.body) {
              const { ip, country } = response.body;
              geoInfoService.ipSubject.next(ip);
              geoInfoService.countrySubject.next(country);
            } else {
              console.error('Error: Response body is undefined or invalid');
              geoInfoService.ipSubject.next(null);
              geoInfoService.countrySubject.next(null);
            }
          },
          error: (error: unknown) => {
            console.error('Error loading geo info:', error instanceof Error ? error.message : error);
            geoInfoService.ipSubject.next(null);
            geoInfoService.countrySubject.next(null);
          },
        })
      )
    );
  };
}

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule.forRoot(ngxUiLoaderHttpConfig),
    // NgbModule,
    SharedModule,
    CoreModule,
    LandingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GeoInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [GeoInfoService, HttpBackend],
    },
    DatePipe,
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
    TitleCasePipe,
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
