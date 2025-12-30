import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route) => {

  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.me().pipe(
    map((user: any) => {

      const allowedRoles = route.data?.['roles'];

      // no role restriction
      if (!allowedRoles) {
        return true;
      }

      // role allowed
      if (allowedRoles.includes(user.role)) {
        return true;
      }

      router.navigate(['/login']);
      return false;
    }),
    catchError(() => {
      // ⚠️ IMPORTANT: allow navigation to continue after login
      return of(true);
    })
  );
};
