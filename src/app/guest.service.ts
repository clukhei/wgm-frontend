import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { promise } from "protractor";
import { attendingGuest, invitedGuest, rsvpForm } from "./models";



const BASE_URL = "http://localhost:3000/guests"
@Injectable()
export class GuestService {
    headers: HttpHeaders
    constructor(private http: HttpClient){
        this.headers = new HttpHeaders({
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        })
    }
   
    generateToken(repName: string){
        return this.http.post<any>(`${BASE_URL}/rsvp-link`, {repName}, {headers: this.headers}).toPromise()
    }



      
    getInvited():Promise<invitedGuest[]> {
        return this.http.get<invitedGuest[]>(`${BASE_URL}/invited`, {headers: this.headers}).toPromise()
    }

    getAttending():Promise<attendingGuest[]> {
        return this.http.get<attendingGuest[]>(`${BASE_URL}/attending`, {headers: this.headers}).toPromise()
    }
    checkIn(id:number): Promise<any>{
        
        return this.http.get<any>(`http://localhost:3000/checkin/${id}`).toPromise()
    }
    
}