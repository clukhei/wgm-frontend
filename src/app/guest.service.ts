import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {environment} from "../environments/environment"
import { attendingGuest, invitedGuest, rsvpForm } from "./models";



const BASE_URL = `${environment.backendUrl}/guests`
@Injectable()
export class GuestService {
    headers: HttpHeaders
    constructor(private http: HttpClient){
        this.headers = new HttpHeaders({
            "Content-Type": "application/json",
            'Accept': "applicatoin/json",
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

    getArrivals(): Observable<any>{
        return this.http.get(`${BASE_URL}/arrived-count`, {headers: this.headers})
            .pipe(
                tap(_ => console.log(_, "fetched arrivals")),
                catchError(this.handleError)
            )
    }

    private handleError(error: HttpErrorResponse){
        if (error.error instanceof ErrorEvent){
            console.error('An error occurred:', error.error.message)
        } else{
            console.error(
                `Backend returned code ${error.status}` +
                `body was ${error.error}`
            )
        }
        return throwError(
            `Error status ${error.status}. Something bad happened. Please try again later`
        )
    }
    checkIn(id:number): Promise<any>{
        
        return this.http.get<any>(`${environment.backendUrl}/checkin/${id}`).toPromise()
    }
    
    updateTables(data: attendingGuest[]): Promise<any> {
       const uploads= data.map(e=> {
            return {id: e.id, tableNo: e.tableNo}
        })
        return this.http.post<any>(`${BASE_URL}/update-tableno`,uploads,{headers: this.headers} ).toPromise()
    }
}