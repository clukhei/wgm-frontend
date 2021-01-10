import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-see-you',
  templateUrl: './see-you.component.html',
  styleUrls: ['./see-you.component.css']
})
export class SeeYouComponent implements OnInit {

  seeYouTitle="Thank you page"
  seeYouSideTitle = "RSVP"
  name=""
  constructor(private activatedRoute: ActivatedRoute) { 
    this.name = this.activatedRoute.queryParams["_value"]["name"]
  }

  ngOnInit(): void {
    this.seeYouTitle = `See you ${this.name}`
  }

}
