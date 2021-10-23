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
        const token = this.storageService.getCookie("token");
        if (!token) {
            this.router.navigate(['login']);
            return false;
        }
        else {
            this.router.navigate(['home/portal']);
            return true;
        }
    }
}
