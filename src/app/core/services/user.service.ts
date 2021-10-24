import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(
        private httpClient: HttpClient,
        private router: Router,
    ) { }

    public login(body: any): Observable<any> {
        return this.httpClient.post(`${environment.apiUrl}auth/signin`, body);
    }

    public forgetPassword(body: any): Observable<any> {
        return this.httpClient.post(`${environment.apiUrl}auth/forgotpassword`, body);
    }

    public getUserInfo(): Observable<any> {
        return this.httpClient.get(`${environment.apiUrl}user`);
    }

    public updateUserInfo(body: any): Observable<any> {
        return this.httpClient.post(`${environment.apiUrl}user`, body);
    }

    public getPoducts(): Observable<any> {
        return this.httpClient.get(`${environment.apiUrl}products`);
    }

    public updateAddCart(body: any): Observable<any> {
        return this.httpClient.post(`${environment.apiUrl}cart`, body);
    }

    public getUserCart(): Observable<any> {
        return this.httpClient.get(`${environment.apiUrl}cart`);
    }

    public confirmOrder(body: any): Observable<any> {
        return this.httpClient.post(`${environment.apiUrl}order`, body);
    }
}
