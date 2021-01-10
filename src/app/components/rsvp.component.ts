import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoService } from '../info.service';
import { allergies, foodPref, rsvpForm } from '../models';
import { RsvpService } from '../rsvp.service';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css']
})
export class RsvpComponent implements OnInit {
  rsvpForm: FormGroup
  foodPref: foodPref[]
  allergies: allergies[]
  tokenId: string
  relationshipId: number
  tokenValid: boolean
  rsvpTitle: string = "RSVP"
  rsvpSideTitle: string =""
  constructor(private fb: FormBuilder, private infoSvc: InfoService,private router: Router,private activatedRoute: ActivatedRoute, private rsvpSvc: RsvpService) { 
    this.tokenId = this.activatedRoute.snapshot.params['token']
    this.relationshipId = this.activatedRoute.snapshot.params['rsId']
    this.validateLink(this.tokenId)
  }

  ngOnInit(): void {
    this.fetchFoodInfo()
    this.fetchAllergyInfo()
    this.rsvpForm = this.fb.group({
      name: this.fb.control('', Validators.required),
      email: this.fb.control('', Validators.required),
      foodId: this.fb.control('', Validators.required),
      allergyId: this.fb.control('', Validators.required)
    })
  }
  
  fetchFoodInfo(){
    return this.infoSvc.getFoodPref()
      .then(res =>{
        this.foodPref = res
        console.log(this.foodPref)
      })
  }
  fetchAllergyInfo(){
    return this.infoSvc.getAllergies()
      .then(res=> {
        this.allergies = res
        console.log(this.allergies)
      })
  }

  rsvp(){
    let rsvpData = this.rsvpForm.value
    rsvpData.tokenId = this.tokenId
    rsvpData.foodId = parseInt(rsvpData.foodId)
    rsvpData.allergyId = parseInt(rsvpData.allergyId)
    rsvpData.relationshipId = this.relationshipId
    console.log(rsvpData.name)
    this.rsvpSvc.saveRsvp(rsvpData as rsvpForm)
      .then(res => {
        console.log(res)
        this.router.navigate(['/rsvp/complete'], {queryParams: {name: rsvpData.name}})
      })
      .catch(e=> console.log(e))
  }

  validateLink(token){
    this.rsvpSvc.checkLinkValidity(token)
      .then(result => this.tokenValid = result.valid)
      .catch(e=>console.log(e))
  }


}
