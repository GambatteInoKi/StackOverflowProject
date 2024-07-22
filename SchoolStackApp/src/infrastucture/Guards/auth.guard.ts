import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      if (state.url === '/') {
        this.router.navigate(['/search']);
        return false;
      }
      return true;
    } else {
      if (state.url !== '/') {
        this.router.navigate(['']);
        return false;
      }
      return true;
    }
  }
}
