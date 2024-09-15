import { HttpInterceptorFn } from '@angular/common/http';
import { LocalStorageService } from '../services/local-storage.service';

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJlbW9uQGVtb24uY29tIiwiZXhwIjoxNzE4NzEwMjIxLCJpc3MiOiJzbmlwcGV0X2FwaSIsImF1ZCI6InNuaXBwZXRfYXBpIn0.aT9l-l70QB4ub_yz0Fbet0l3eoCA8XxHHtGFh8Iondo
export const jwtInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

 var localStorageService = new LocalStorageService();
  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${localStorageService.gettoken()}`),
    // setHeaders: {
    //   //Authorization: `Bearer ${LocalStorageService.gettoken()}` 
    //   Authorization: `Bearer dgdfdgrrgrg` 
    // },
  });



  return next(authReq);
};
