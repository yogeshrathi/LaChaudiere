import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  constructor() { }

  getCookie(key: string): any {
    return localStorage.getItem(key);
  }

  setCookie(key: string, value: any): any {
    return localStorage.setItem(key, value);
  }

  clearCookie(): any {
    return localStorage.clear();
  }

}
