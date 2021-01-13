import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-failure',
  templateUrl: './failure.component.html',
  styleUrls: ['./failure.component.css']
})
export class FailureComponent implements OnInit {

  constructor(private router: Router) { }
  backToCheckIn(){
    this.router.navigate(['/checkin'])
  }
  ngOnInit(): void {
  }

}
