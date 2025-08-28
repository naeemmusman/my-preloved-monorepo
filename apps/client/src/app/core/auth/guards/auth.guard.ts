import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  // const userService = inject(UserService);
  const router = inject(Router);
  
  return authService.isLoggedIn$.pipe(
    take(1),
    map((authenticated) => {
      if (authenticated) {
        return true;
      }
      
      router.navigateByUrl('/sign-in');
      return false;
    })
  );
};
