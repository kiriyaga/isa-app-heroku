import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let sessionUser = JSON.parse(localStorage.getItem('sessionUser'));
        if (sessionUser && sessionUser.token) {
           
            const clonedRequest = request.clone({ headers:request.headers.set('Token-Authority', sessionUser.token) })
            
            return next.handle(clonedRequest);
           
        }
        return next.handle(request)
       
    }
}