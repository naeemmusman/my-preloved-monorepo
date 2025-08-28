import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { CryptoComponent } from '@modules/admin/dashboards/crypto/crypto.component';
import { CryptoService } from '@modules/admin/dashboards/crypto/crypto.service';

export default [
    {
        path: '',
        component: CryptoComponent,
        resolve: {
            data: () => inject(CryptoService).getData(),
        },
    },
] as Routes;
