import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { FinanceComponent } from '@modules/admin/dashboards/finance/finance.component';
import { FinanceService } from '@modules/admin/dashboards/finance/finance.service';

export default [
    {
        path: '',
        component: FinanceComponent,
        resolve: {
            data: () => inject(FinanceService).getData(),
        },
    },
] as Routes;
