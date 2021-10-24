import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class UserGuard implements CanActivate {

    constructor(private storageService: StorageService,
        private router: Router) {

    }

    canActivate(): boolean {
        const token = localStorage.getItem("token");
        if (token) {
            return true;
        }
        else {
            this.router.navigate(['/']);
            return false;
        }
    }
    canActivateChild(): boolean {
        const token = localStorage.getItem("token");
        if (token) {
            return true;
        }
        else {
            this.router.navigate(['/']);
            return true;
        }
    }
}
