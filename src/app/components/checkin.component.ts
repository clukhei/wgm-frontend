import { Component, OnInit } from '@angular/core';
import { GuestService } from '../guest.service';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { attendingGuest } from '../models';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {
  guestNames = []
  guestList : attendingGuest[]=[]
  tableNo: Number =null
  constructor(private guestSvc: GuestService) { }

  ngOnInit(): void {
    this.fetchAttendingGuests()
  }

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.length < 2 ? []
      : this.guestNames.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )

    
  fetchAttendingGuests(){
    this.guestSvc.getAttending()
    .then(res => {
      this.guestList = res
      this.guestNames = res.map(i=> {
        return i.last_name + " " + i.first_name  
      })
    })
  }

  getTableNo(input){
    console.log(input.value)
    console.log(this.guestNames)
    const idx = this.guestNames.findIndex(i=> i == input.value)
    console.log(idx)
    console.log(this.guestList[idx])
    this.tableNo = /* this.guestList[idx].table */ 1
    console.log(this.tableNo)
    this.guestSvc.checkIn(this.guestList[idx].id)
      .catch(err=> console.log(err))
  }
}
