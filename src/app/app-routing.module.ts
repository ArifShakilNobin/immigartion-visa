import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './modules/landing/component/landing/landing.component';
import { DefaultLayoutComponent } from './shared/modules/default-layout/default-layout.component';
import { AuthenticationGuard } from './modules/authentication/services/authentication.guard';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { LoginComponent } from './modules/authentication/components/login/login.component';
import { RegistrationComponent } from './modules/authentication/components/registration/registration.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },

  {
    path: 'home',
    component: DefaultLayoutComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'authentication',loadChildren: () =>import('./modules/authentication/authentication.module').then((m) => m.AuthenticationModule),},
      // { path: 'authorization', loadChildren: () => import('./modules/authorization/authorization.module').then((m) => m.AuthorizationModule),},
      { path: 'test', loadChildren: () => import('./modules/test/test.module').then((m) => m.TestModule),},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  exports: [RouterModule],
})
export class AppRoutingModule {}
