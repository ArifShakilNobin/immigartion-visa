import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from '../test.service';

@Component({
  selector: 'app-test',
  standalone: false,
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {


  testData: any;


  constructor(
    private router: Router,
    private testService: TestService
  ) {
    this.testService.test().subscribe({
      next: (response) => {
        if (response && response.success && response.data) {
          this.testData = response.data;
        } else {
          console.error('Token not found in the response');
        }
      }
    });
  }

}
