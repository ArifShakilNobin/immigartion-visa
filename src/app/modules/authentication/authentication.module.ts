import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { AuthInterceptor } from 'src/app/shared/services/http-interceptors/auth-interceptor';
import { LandingModule } from '../landing/landing.module';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthenticationRoutes } from './Authentication.routing';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthenticationRoutes,
    NgZorroAntdModule,
    LandingModule,

  ],
  declarations: [LoginComponent, RegistrationComponent],
  // providers: [
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: AuthInterceptor,
  //     multi: true
  //   }
  // ],
})
export class AuthenticationModule { }
