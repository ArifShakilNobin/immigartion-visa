import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LandingModule } from 'src/app/modules/landing/landing.module';
import { DefaultLayoutRoutes } from './default-layout.routing';
import { NgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { DefaultLayoutComponent } from './default-layout.component';

@NgModule({
  imports: [
    SharedModule,
    DefaultLayoutRoutes,
    NgZorroAntdModule,
    LandingModule,
  ],
  declarations: [DefaultLayoutComponent],
})
export class DefaultLayoutModule {}
