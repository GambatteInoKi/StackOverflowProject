import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SearchGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const hasQueryParams = !!route.queryParams['keyword'];
    if (!hasQueryParams) {
      this.router.navigate(['/search']);
      return false;
    }
    return true;
  }
}
