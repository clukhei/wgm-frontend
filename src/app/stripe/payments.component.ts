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


  isCollapsed: boolean = true
  paymentForm: FormGroup
  constructor(private fb: FormBuilder, private paymentSvc: PaymentService, private stripe: StripeService) { }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      amount: this.fb.control('',  [Validators.required, Validators.min(10), Validators.pattern("^[1-9][0-9]*$")]),
    })
  }
  show(){
    this.isCollapsed = !this.isCollapsed
  }


  stripeCheckout(){

    const test : paymentBody = {
      unit_amount: this.paymentForm.get('amount').value,
      name: "crimson",
      id: 4
    }
    
  

    this.paymentSvc.stripeCheckout(test)
      .then(session=> {
        return this.stripe.redirectToCheckout({sessionId: session.id}).subscribe()

      })
    
      .catch(error => {
        console.log(error)
      })
  }

}
