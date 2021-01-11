import { Component, OnInit } from '@angular/core';
import { InfoService } from '../info.service';
import { RsvpService } from '../rsvp.service';
import * as CanvasJS from '../canvasjs.min.js';
import { timeStamp } from 'console';
import { Papa } from 'ngx-papaparse';
import { attendingGuest } from '../models';
import { type } from 'os';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private rsvpSvc: RsvpService, private papa: Papa) { }
  header: string = "Dashboard"
  totalInvited: number
  attending: number
  arrived: number
  attendingGuestsData: attendingGuest[]



  ngOnInit(): void {
    this.getSummary()



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


}
