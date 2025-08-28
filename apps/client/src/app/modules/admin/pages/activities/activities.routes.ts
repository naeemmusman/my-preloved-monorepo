import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ActivitiesComponent } from '@modules/admin/pages/activities/activities.component';
import { ActivitiesService } from '@modules/admin/pages/activities/activities.service';

export default [
    {
        path: '',
        component: ActivitiesComponent,
        resolve: {
            activities: () => inject(ActivitiesService).getActivities(),
        },
    },
] as Routes;
