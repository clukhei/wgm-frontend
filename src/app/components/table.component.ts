import { Component, OnInit } from '@angular/core';
import { attendingGuest, invitedGuest } from '../models';
import { RsvpService } from '../rsvp.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  header: string = "Guest Info"
  data: attendingGuest[]
  constructor(private rsvpSvc: RsvpService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    const getAttending = this.rsvpSvc.getAttending()
      .then(res => {
        console.log(res)
        this.data = res

      })
  }
}


