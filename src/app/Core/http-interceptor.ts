import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core'; 
import { TokenService } from './services/token.service';
export const HttpInterceptorService: HttpInterceptorFn = (req, next) => {
    const authToken = inject(TokenService).getToken();
    const clonedReq = req.clone({
      setHeaders: { Authorization: `Bearer ${authToken}`}
    });
    return next(clonedReq);
  };
