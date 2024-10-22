import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/modules/shared/shared.module';
import { httpInterceptorProviders } from '../shared/services/http-interceptors';
import { AuthenticationModule } from '../modules/authentication/authentication.module';
import { DefaultLayoutModule } from '../shared/modules/default-layout/default-layout.module';
@NgModule({
  imports: [SharedModule, AuthenticationModule,DefaultLayoutModule],
  declarations: [],
  providers: [httpInterceptorProviders],
})
export class CoreModule {}
