import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private router: Router) {

    }

    canActivate(): boolean {
        const r = localStorage.getItem("r");
        const token = localStorage.getItem("token");
        if (r && token) {
            return true;
        }
        else {
            this.router.navigate(['/']);
            return false;
        }
    }
    canActivateChild(): boolean {
        const r = localStorage.getItem("r");
        const token = localStorage.getItem("token");
        if (r && token) {
            return true;
        }
        else {
            this.router.navigate(['/']);
            return true;
        }
    }
}
