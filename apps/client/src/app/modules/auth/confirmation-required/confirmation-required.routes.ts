import { Routes } from '@angular/router';
import { AuthConfirmationRequiredComponent } from '@modules/auth/confirmation-required/confirmation-required.component';

export default [
    {
        path: '',
        component: AuthConfirmationRequiredComponent,
    },
] as Routes;
