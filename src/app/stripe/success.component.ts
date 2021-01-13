import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { paymentBody } from '../models';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  payerInfo: paymentBody
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private paymentSvc: PaymentService) { 
   console.log( this.activatedRoute.snapshot.queryParams)
   this.payerInfo = this.activatedRoute.snapshot.queryParams as paymentBody
  }
  backToCheckIn(){
    this.router.navigate(['/checkin'])
  }
  ngOnInit(): void {
    this.paymentSvc.savePaymentRecord(this.payerInfo)
    .then(res=> {
      console.log(res)
    })

  }

}
