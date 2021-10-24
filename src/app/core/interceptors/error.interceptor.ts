import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
//import { map } from 'lodash';
import * as HttpStatus from 'http-status-codes';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
//import { authUrls } from 'src/app/shared/constants/auth-urls.constant';
//import { AuthService } from 'src/app/core/services/auth';

import { environment } from './../../../environments/environment';
import { StorageService } from '../services/storage.service';
import { GeneralService } from '../services/general.service';

const accessTokenUrl = '/google_login';

//const authUrlsArr = map(authUrls, authUrl => authUrl);
// tslint:disable-next-line: no-shadowed-variable


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private toastrService: ToastrService,
        private generalService: GeneralService,
        private storageService: StorageService,
        private spinner: NgxSpinnerService,
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        this.spinner.show();
        return next.handle(this.addToken(request, (localStorage.getItem('token') || '')))
            .pipe(
                finalize(() => this.spinner.hide()),
                catchError((error: HttpErrorResponse) => {
                    this.spinner.hide();
                    if (error.error instanceof ErrorEvent) {
                        this.displayError(`Error: ${error.error.message}`);
                    } else {
                        switch (error.status) {
                            case HttpStatus.UNAUTHORIZED:
                                break;
                            case HttpStatus.FORBIDDEN:
                                break;
                            default:
                                if (this.shouldHandleHttpError(request)) {
                                    this.handleHttpError(error);
                                }
                        }
                    }
                    return throwError(error);
                })
            );
    }

    private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        if (req.url.indexOf(environment.apiUrl) == -1) {
            return req;
        }
        else if (this.isAccessToken(req.url)) {
            return req;
        }
        return req.clone({ setHeaders: { authorization: token } });
    }

    private handleHttpError(err: HttpErrorResponse): void {
        // this.httpErrorHandler.handle(err);
    }

    private displayError(title: string, message: string = ''): void {
        this.toastrService.error(message, title);
    }

    // tslint:disable-next-line: typedef
    private shouldHandleHttpError(request: HttpRequest<any>) {
        return !request.headers.has('_skiphandleerror');
    }

    private isAccessToken(url: string): boolean {
        return url.indexOf(accessTokenUrl) > -1;
    }

}
