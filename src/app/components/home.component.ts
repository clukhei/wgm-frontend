import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InfoService } from '../info.service';
import { GuestService } from '../guest.service';
import * as CanvasJS from '../canvasjs.min.js';

import { Papa } from 'ngx-papaparse';
import { attendingGuest, generateToken, invitedGuest, invitedNames } from '../models';

import { Observable, Subject } from 'rxjs';
import {debounceTime, distinctUntilChanged, map, takeUntil} from 'rxjs/operators';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild('file') csvfile: ElementRef
  constructor(private guestSvc: GuestService, private papa: Papa, private fb: FormBuilder, private router: Router) { }
  header: string = "Dashboard"
  totalInvited: number
  attending: number
  arrived: number
  attendingGuestsData: attendingGuest[]
  invitedGuestNames = []
  tokenTicket: generateToken
  generateLinkForm : FormGroup

  arrivalResult : number
  notifier = new Subject()



  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.length < 2 ? []
      : this.invitedGuestNames.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )

  isCollapsed: boolean = true

  ngOnInit(): void {
    this.getSummary()
    this.getArrivals()
    this.generateLinkForm = this.fb.group({
      name: this.fb.control('', Validators.required),
      link: this.fb.control('')
    })

   

    console.log(this.generateLinkForm)
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

  getArrivals(){
    this.guestSvc.getArrivals()
    .pipe(takeUntil(this.notifier))
    .subscribe(
      res => {
        this.arrivalResult = res[0].count
      },
      err => {
        console.log(err)
      }
    )
  }
  getSummary() {
    const getInvited = this.guestSvc.getInvited()
      .then(res => {
        console.log(res)
        this.totalInvited = res.length
        this.invitedGuestNames = res.map(i=> {
          return i.rep_name
        })
      })
      .catch(e => console.log(e))

    const getAttending = this.guestSvc.getAttending()
      .then(res => {
        console.log(res)
        this.attending = res.length
        this.attendingGuestsData = res
      })
      Promise.all([getInvited, getAttending])
  }

  uploading: boolean = false
  uploadCSV(file){
    //call an api
    this.uploading = true 
    this.guestSvc.updateTables(this.jsonParsedData)
      .then((res)=> {
        this.uploading=false 
        return res
      })
      .then(res=>{
        alert(res.message)
        window.location.reload()
      })
      .catch(e=> {
        this.uploading = false
        alert("upload error: please use exact template from downloaded guestlist")
        console.log(e)

      })
  }

 jsonParsedData: attendingGuest[]

  handleCSVInput($event){
    console.log($event.srcElement.files)
    const file = $event.srcElement.files
    const reader: FileReader = new FileReader()
    reader.readAsText(file[0])
    reader.onload = e => {
      const csv = reader.result
      this.jsonParsedData = this.papa.parse(csv as string, {header:true, delimiter: ',', dynamicTyping:true}).data as attendingGuest[]
      console.log(this.jsonParsedData)
      
    }
    
  }
  downloadCSV() {

    console.log(this.attendingGuestsData)
    const csv = this.papa.unparse(this.attendingGuestsData, {
      "columns": ["id", "first_name", "last_name", "tableNo", "email", "type", "allergy", "food_type"]
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
    const rsvpUrl = `https://frontend-chi-two.vercel.app`
    console.log(this.invitedGuestNames)
    const repName = this.generateLinkForm.get('name').value
    this.guestSvc.generateToken(repName)
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
    this.generateLinkForm.reset()
    this.isCollapsed = !this.isCollapsed
  }

  logout(){
    localStorage.removeItem("token")
    this.router.navigate(['/'])
  
  }

  goCheckIn(){
    this.router.navigate(['/checkin'])
  }
}
