import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { TestComponent } from './test/test.component';
import { TestRoutes } from './test.routing';



@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    SharedModule,
    TestRoutes

  ]
})
export class TestModule { }
