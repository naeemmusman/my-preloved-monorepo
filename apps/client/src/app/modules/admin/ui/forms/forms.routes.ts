import { Routes } from '@angular/router';
import { FormsFieldsComponent } from '@modules/admin/ui/forms/fields/fields.component';
import { FormsLayoutsComponent } from '@modules/admin/ui/forms/layouts/layouts.component';
import { FormsWizardsComponent } from '@modules/admin/ui/forms/wizards/wizards.component';

export default [
    {
        path: 'fields',
        component: FormsFieldsComponent,
    },
    {
        path: 'layouts',
        component: FormsLayoutsComponent,
    },
    {
        path: 'wizards',
        component: FormsWizardsComponent,
    },
] as Routes;
