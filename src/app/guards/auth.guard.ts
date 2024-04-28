import {ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {

    const tokenParts:any = authService.getToken()?.split('.');

    if (tokenParts.length === 3) {
      const payload = JSON.parse(atob(tokenParts[1]));
      const expirationDate: number = payload.exp * 1000;
      const currentTime: number = new Date().getTime();

      if (expirationDate < currentTime) {

        return router.createUrlTree(['/auth/signin']);

      }else{

        return true;

      }

    } else {
      return router.createUrlTree(['/auth/signin']);
    }

  }else{
    return router.createUrlTree(['/auth/signin']);
  }

};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => AuthGuard(route, state);
