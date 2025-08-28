import { Routes } from '@angular/router';
import { NotesListComponent } from '@modules/admin/apps/notes/list/list.component';
import { NotesComponent } from '@modules/admin/apps/notes/notes.component';

export default [
    {
        path: '',
        component: NotesComponent,
        children: [
            {
                path: '',
                component: NotesListComponent,
            },
        ],
    },
] as Routes;
