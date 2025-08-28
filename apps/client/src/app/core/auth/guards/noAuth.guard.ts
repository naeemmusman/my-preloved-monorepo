// import { inject } from '@angular/core';
// import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
// import { map, take } from 'rxjs';

// export const noAuthGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
//     const authService = inject(AuthService);
//     const router = inject(Router);
//    return authService.authUser$.pipe(take(1),
//     map((user) => {
//       console.log('user in noAuthGuard', user);
//       if (user) {
//         return true;
//       }
      
//       // router.navigateByUrl('/login');
//       router.navigate(['/sign-in']);
//       return false;
//   })
// );
// };


import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';

export const NoAuthGuard: CanActivateFn | CanActivateChildFn = (
    route,
    state
) => {
    const authService = inject(AuthService);
    const router: Router = inject(Router);

    // Check the authentication status
    return authService.authUser$
        .pipe(
            switchMap((authenticated) => {
                // If the user is authenticated...
                if (authenticated) {
                    return of(router.parseUrl(''));
                }

                // Allow the access
                return of(true);
            })
        );
};
