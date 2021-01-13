import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { paymentBody } from "./models";
import { StripeService} from 'ngx-stripe';
import {environment} from "../environments/environment"


const BASE_URL = `${environment.backendUrl}/payment`
@Injectable()
export class PaymentService{

    constructor(private http: HttpClient, private stripe: StripeService){

    }
    stripeCheckout(obj: paymentBody): Promise<any>{
       return this.http.post<any>(`${BASE_URL}/checkout`, obj ).toPromise()
    }

    savePaymentRecord(obj):Promise<any> {
        return this.http.post<any>(`${BASE_URL}/success`, obj).toPromise()
    }
}