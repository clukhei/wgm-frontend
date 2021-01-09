import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { promise } from "protractor";
import { rsvpForm } from "./models";

const BASE_URL = "http://localhost:3000/guests"
@Injectable()
export class RsvpService {
    constructor(private http: HttpClient){

    }

    generateToken(){
    
    }

    checkLinkValidity(token){
        return this.http.get<any>(`${BASE_URL}/rsvp/${token}`).toPromise()
    }

    saveRsvp(rsvpData: rsvpForm): Promise<any>{
        return this.http.post<any>(`${BASE_URL}/rsvp`, rsvpData).toPromise()
    }
}