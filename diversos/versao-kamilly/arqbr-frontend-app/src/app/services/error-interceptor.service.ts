import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { PoNotificationService } from '@po-ui/ng-components'
import { AuthService } from './auth.service'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private poNotificationService: PoNotificationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.signOut()
        }

        if (error.status === 404) {
          switch (error.error.message) {
            case ('not null constraint'):
              this.poNotificationService.warning({
                message: 'Não foi possível deletar! Este item está vinculado a outro.',
                duration: environment.poNotificationDuration
              })
              break
          }          
        }
        return throwError(error.error)
      })
    )
  }
}
