import { Injectable, NgModule } from "@angular/core";

import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const userLoggedString = localStorage.getItem('user_logged');

        // Verifica se os dados do usuário logado existem e se são válidos
        if (userLoggedString) {
            const userLogged = JSON.parse(userLoggedString);
            const token = userLogged.token;

            // Clona a requisição original e adiciona o token de autorização, se disponível
            const dupReq = req.clone({
                headers: req.headers.set('Authorization', token ? `Bearer ${token}` : ''),
            });

            // Retorna a requisição clonada
            return next.handle(dupReq);
        } else {
            // Se os dados do usuário não existem, prossegue sem modificar a requisição
            return next.handle(req);
        }
    }
}

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpsRequestInterceptor,
            multi: true,
        },
    ],
})

export class Interceptor { }