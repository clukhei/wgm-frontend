import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { allergies, foodPref, GuestNames, invitedGuest, relationship } from "./models";
import {environment} from "../environments/environment"

const BASE_URL = `${environment.backendUrl}/info`
@Injectable()

export class InfoService {

    constructor(private http: HttpClient) {

    }
    getRelationships(): Promise<relationship[]> {
        return this.http.get<relationship[]>(`${BASE_URL}/relationship`).toPromise()
    }

    getFoodPref(): Promise<foodPref[]> {
        return this.http.get<foodPref[]>(`${BASE_URL}/food`).toPromise()
    }
    getAllergies():Promise<allergies[]>{
        return this.http.get<allergies[]>(`${BASE_URL}/allergy`).toPromise()
        
    }
    getGuestNames():Promise<GuestNames[]> {
        return this.http.get<GuestNames[]>(`${BASE_URL}/guestnames`).toPromise()
    }
  

}