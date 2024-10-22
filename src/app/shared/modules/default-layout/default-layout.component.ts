import { Component, OnInit } from '@angular/core';
import { applicationPermissions } from '../../application-constants/application-permissions';
import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { AuthenticationStorageService } from 'src/app/modules/authentication/services/authentication-storage.service';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {
  isCollapsed = false;
  applicationPermissions = applicationPermissions;
  constructor(
    public authorizationService: AuthenticationService,
    private authenticationService: AuthenticationService,
    private notification: NzNotificationService,
    private router: Router,
    private authStorageService: AuthenticationStorageService,
  ) {}




  ngOnInit(): void {}
  onLogout() {
    this.authStorageService.logout();
  }

  userProfile() {
    throw new Error('Method not implemented.');
  }
  onChangePassword() {
    throw new Error('Method not implemented.');
  }
}
