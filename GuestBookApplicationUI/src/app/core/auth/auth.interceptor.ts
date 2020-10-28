import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') == "True") {
            return next.handle(req.clone());
        }
        
        if (localStorage.getItem('user_token') != null) {
            const cloneRequest = req.clone({
                headers: req.headers.set('Authorization', localStorage.getItem('user_token'))
            });
            return next.handle(cloneRequest);
        } else {
            this.router.navigateByUrl('/login');
        }
    } 
}