import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { rsvpForm } from "./models";

const BASE_URL = "http://localhost:3000/rsvp"

@Injectable()
export class RsvpService {
    constructor(private http: HttpClient){}
    checkLinkValidity(token){
        let params = (new HttpParams()).set("token", token)
        return this.http.get<any>(`${BASE_URL}/form`, {params}).toPromise()
    }

    saveRsvp(rsvpData: rsvpForm): Promise<any>{
        return this.http.post<any>(`${BASE_URL}/submit`, rsvpData).toPromise()
    }
}