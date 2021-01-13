import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http"
import { loginSuccess } from "./models";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

import {environment} from "../environments/environment"
const BASE_URL = environment.backendUrl
@Injectable()
export class AuthService implements CanActivate{
    constructor(private http: HttpClient, private router: Router){}

    doLogin(email: string, password: string): Promise<loginSuccess> {
        return this.http.post<loginSuccess>(`${BASE_URL}/login`, {email, password}).toPromise()
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if (localStorage.getItem("token")) {
            return true
        } 
        return this.router.parseUrl('/')
    }
}