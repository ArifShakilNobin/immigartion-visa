import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { applicationPermissions } from 'src/app/shared/application-constants/application-permissions';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit {
  isShowTab: boolean = false;
  userInfo: any;
  isOkLoading = false;

  applicationPermissions = applicationPermissions;

  constructor(
    private router: Router,
    private notification: NzNotificationService,
    private modal: NzModalService
  ) {}

  ngOnInit() {
    let currentuserInfo = localStorage.getItem('currentUserInfo');
    if (currentuserInfo != null) {
      this.userInfo = JSON.parse(currentuserInfo);
    }
  }
}
