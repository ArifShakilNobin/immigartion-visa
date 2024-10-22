import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { LandingComponent } from './component/landing/landing.component';
import { MainContentComponent } from './component/main-content/main-content.component';
import { LandingRoutingModule } from './landing-routing.module';


@NgModule({
  declarations: [
    LandingComponent,
    HeaderComponent,
    MainContentComponent,
    FooterComponent,
  ],
  imports: [LandingRoutingModule, CommonModule, SharedModule, NgZorroAntdModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, MainContentComponent, LandingComponent],
})
export class LandingModule {}
