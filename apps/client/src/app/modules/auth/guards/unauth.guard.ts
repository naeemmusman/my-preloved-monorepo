import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // adjust path accordingly
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.authUser$.pipe(
      map(user => {
        if (!user) {
          return true; // Allow access if user is not authenticated
        } else {
          this.router.navigate(['/']); // Redirect to home if user is authenticated
          return false; // Prevent access to the route
        }
      })
    );

  }
}
