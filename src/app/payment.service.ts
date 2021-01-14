import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { paymentBody } from "./models";
import { StripeService} from 'ngx-stripe';
import {environment} from "../environments/environment"
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router"


const BASE_URL = `${environment.backendUrl}/payment`
@Injectable()
export class PaymentService implements CanActivate { 

    payingStripeMode: boolean =false
    constructor(private http: HttpClient, private router: Router){

    }
    stripeCheckout(obj: paymentBody): Promise<any>{
        localStorage.setItem('paymentStripeMode', "true")
        
       return this.http.post<any>(`${BASE_URL}/checkout`, obj ).toPromise()
    }

    savePaymentRecord(obj):Promise<any> {
        return this.http.post<any>(`${BASE_URL}/success`, obj).toPromise()
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const paymentStripeMode = localStorage.getItem('paymentStripeMode')
        if (paymentStripeMode === null || paymentStripeMode != "true"){
            return this.router.parseUrl('/checkin')
        }else {
            return true
        }
    }
  
}