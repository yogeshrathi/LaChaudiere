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

    public getProducts(): Observable<any> {
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

    public getCustomers(): Observable<any> {
        return this.httpClient.get(`${environment.apiUrl}users`);
    }

    public getAvlDays(): Observable<any> {
        return this.httpClient.get(`${environment.apiUrl}user/getAvlDays`);
    }

    public addUser(data: any): Observable<any>{
        return this.httpClient.post(`${environment.apiUrl}auth/signup`, data);
    }

    public updateUser(data: any): Observable<any>{
        return this.httpClient.post(`${environment.apiUrl}auth/updateUserInfo`, data);
    }

    public addProduct(data: any): Observable<any>{
        return this.httpClient.post(`${environment.apiUrl}products/add`, data);
    }

    public updateProduct(data: any): Observable<any>{
        return this.httpClient.post(`${environment.apiUrl}products/update`, data);
    }

    public deleteProduct(data: any): Observable<any>{
        return this.httpClient.post(`${environment.apiUrl}products/delete`, data);
    }

    public deleteCustomer(data: any): Observable<any>{
        return this.httpClient.post(`${environment.apiUrl}user/delete`, data);
    }

    public getSignature(): Observable<any>{
        return this.httpClient.get(`${environment.apiSign}`);
    }

    public uploadFile(data: any): Observable<any>{
        return this.httpClient.post('https://api.cloudinary.com/v1_1/dqosaghas/auto/upload', data);
    }
}
