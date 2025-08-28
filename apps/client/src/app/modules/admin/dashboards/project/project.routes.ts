import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ProjectComponent } from '@modules/admin/dashboards/project/project.component';
import { ProjectService } from '@modules/admin/dashboards/project/project.service';

export default [
    {
        path: '',
        component: ProjectComponent,
        resolve: {
            data: () => inject(ProjectService).getData(),
        },
    },
] as Routes;
