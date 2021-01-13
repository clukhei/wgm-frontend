import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { paymentBody } from "./models";
import { StripeService} from 'ngx-stripe';
@Injectable()

export class PaymentService{

    constructor(private http: HttpClient, private stripe: StripeService){

    }
    stripeCheckout(obj: paymentBody): Promise<any>{
       return this.http.post<any>("http://localhost:3000/payment/checkout", obj ).toPromise()
    }

}