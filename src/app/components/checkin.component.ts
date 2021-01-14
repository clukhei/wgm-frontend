import { Component, OnInit } from '@angular/core';
import { GuestService } from '../guest.service';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { attendingGuest, GuestNames } from '../models';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {
  guestNames = []
  guestList : GuestNames[]=[]
  tableNo: Number =null
  checkedInGuestId: number
  constructor(private guestSvc: GuestService, private infoSvc: InfoService) { }

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
    this.infoSvc.getGuestNames()
    .then(res => {
      this.guestList = res
      this.guestNames = res.map(i=> {
        return i.last_name + " " + i.first_name  
      })
    })
  }

  getTableNo(input){
   
    const idx = this.guestNames.findIndex(i=> i == input.value)
 
    this.checkedInGuestId = this.guestList[idx].id
    this.tableNo = this.guestList[idx].tableNo 
    this.guestSvc.checkIn(this.checkedInGuestId)
      .catch(err=> console.log(err))
  }
}
