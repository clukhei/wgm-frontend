import { Component, OnInit } from '@angular/core';
import { InfoService } from '../info.service';
import { RsvpService } from '../rsvp.service';
import * as CanvasJS from '../canvasjs.min.js';
import { timeStamp } from 'console';
import { Papa } from 'ngx-papaparse';
import { attendingGuest, generateToken, invitedGuest, invitedNames } from '../models';
import { type } from 'os';
import { Observable } from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { Form, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  constructor(private rsvpSvc: RsvpService, private papa: Papa, private fb: FormBuilder) { }
  header: string = "Dashboard"
  totalInvited: number
  attending: number
  arrived: number
  attendingGuestsData: attendingGuest[]
  invitedGuestNames = []
  tokenTicket: generateToken
  generateLinkForm : FormGroup



  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.length < 2 ? []
      : this.invitedGuestNames.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )

  isCollapsed: boolean = true

  ngOnInit(): void {
    this.getSummary()

    this.generateLinkForm = this.fb.group({
      name: this.fb.control(''),
      link: this.fb.control('')
    })

    // let chart = new CanvasJS.Chart("chartContainer", {
    //   animationEnabled: true,
    //   data: [{
    //     type: "doughnut",
    //     startAngle: 60,
    //     //innerRadius: 60,
    //     toolTipContent: "<b>{label}:</b> {y} (#percent%)",
    //     dataPoints: [
    //       { y: 100 -3, label: "Total Guests" },
    //       { y: 3, label: "Arrived" },

    //     ]
    //   }]
    // });
    // chart.render();

  }
  getSummary() {
    const getInvited = this.rsvpSvc.getInvited()
      .then(res => {
        console.log(res)
        this.totalInvited = res.length
        this.invitedGuestNames = res.map(i=> {
          return i.rep_name
        })
      })
      .catch(e => console.log(e))

    const getAttending = this.rsvpSvc.getAttending()
      .then(res => {
        console.log(res)
        this.attending = res.length
        this.attendingGuestsData = res
      })
  }

  downloadCSV() {

    const csv = this.papa.unparse(this.attendingGuestsData, {
      "columns": ["first_name", "last_name", "table", "email", "type", "allergy", "food_type"]
    })

    const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    console.log(csvData)
    console.log(navigator)
    let csvUrl = null
    if (navigator.msSaveBlob) {

      csvUrl = navigator.msSaveBlob(csvData, 'guestlist.csv')
    } else {

      csvUrl = window.URL.createObjectURL(csvData)

    }
    let tempLink = document.createElement('a')
    tempLink.href = csvUrl
    tempLink.download = "guestlist.csv"
    tempLink.setAttribute('download', 'guestlist.csv')
    tempLink.click()

  }

  generateLink(){
    this.isCollapsed = !this.isCollapsed
    const rsvpUrl = `http://localhost:4200/rsvp`
    console.log(this.invitedGuestNames)
    this.rsvpSvc.generateToken("name")
    .then(res=> {
      this.tokenTicket = res
      console.log(this.generateLinkForm.get('link'))
      this.generateLinkForm.get('link').setValue(`${rsvpUrl}/${this.tokenTicket.tokenId}`)
    })
      .catch(err=>console.log(err))
  }
  copy(elem) {
    elem.select()
    elem.setSelectionRange(0,99999)
    document.execCommand("copy")
    alert("copied to clipboard")
  
  }

}
