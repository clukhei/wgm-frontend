import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { min } from 'rxjs/operators';
import { paymentBody } from '../models';
import { PaymentService } from '../payment.service';
import { StripeService} from 'ngx-stripe';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {


  paymentForm: FormGroup
  constructor(private fb: FormBuilder, private paymentSvc: PaymentService, private stripe: StripeService) { }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      amount: this.fb.control('',  [Validators.required, Validators.min(10)]),
    })
  }


  stripeCheckout(){
    const test : paymentBody = {
      unit_amount: 200,
      name: "crimson",
      id: 2 
    }
    
  

    this.paymentSvc.stripeCheckout(test)
      .then(res=> {
        console.log(res)
        return res.paymentSessionId
      })
      .then(session => {
        return this.stripe.redirectToCheckout({sessionId: session}).subscribe()
       
      })
    
      .catch(error => {
        console.log(error)
      })
  }

}
