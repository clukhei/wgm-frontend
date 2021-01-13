import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { paymentBody } from "./models";

@Injectable()

export class PaymentService{

    constructor(private http: HttpClient){

    }
    stripeCheckout(obj: paymentBody): Promise<any>{
       return this.http.post<any>("http://localhost:3000/payment/checkout", obj ).toPromise()
    }
}