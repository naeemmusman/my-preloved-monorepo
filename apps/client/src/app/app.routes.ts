import { Route } from '@angular/router';
import { NoAuthGuard } from './core/auth/guards/noAuth.guard';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './core/auth/guards/auth.guard';
import { initialDataResolver } from './app.resolvers';

// prettier-ignore
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/dashboards/project'
    {path: '', pathMatch : 'full', redirectTo: 'dashboards/project'},

    // Redirect signed-in user to the '/dashboards/project'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {
        path: 'signed-in-redirect',
        pathMatch : 'full',
        redirectTo: 'dashboards/project'
    },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('@modules/auth/confirmation-required/confirmation-required.routes')},
            {path: 'forgot-password', loadChildren: () => import('@modules/auth/forgot-password/forgot-password.routes')},
            {path: 'reset-password', loadChildren: () => import('@modules/auth/reset-password/reset-password.routes')},
            {path: 'sign-in', loadChildren: () => import('@modules/auth/sign-in/sign-in.routes')},
            {path: 'sign-up', loadChildren: () => import('@modules/auth/sign-up/sign-up.routes')}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [authGuard],
        canActivateChild: [authGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('@modules/auth/sign-out/sign-out.routes')}
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'home', loadChildren: () => import('@modules/landing/home/home.routes')},
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [authGuard],
        canActivateChild: [authGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
        children: [

            // Dashboards
            {path: 'dashboards', children: [
                {path: 'project', loadChildren: () => import('@modules/admin/dashboards/project/project.routes')},
                {path: 'analytics', loadChildren: () => import('@modules/admin/dashboards/analytics/analytics.routes')},
                {path: 'finance', loadChildren: () => import('@modules/admin/dashboards/finance/finance.routes')},
                {path: 'crypto', loadChildren: () => import('@modules/admin/dashboards/crypto/crypto.routes')},
            ]},
            
            // Profile
            {path: 'profile', loadChildren: () => import('@modules/admin/pages/profile/profile.routes')},

            // Apps
            {path: 'apps', children: [
                {path: 'academy', loadChildren: () => import('@modules/admin/apps/academy/academy.routes')},
                {path: 'chat', loadChildren: () => import('@modules/admin/apps/chat/chat.routes')},
                {path: 'contacts', loadChildren: () => import('@modules/admin/apps/contacts/contacts.routes')},
                {path: 'ecommerce', loadChildren: () => import('@modules/admin/apps/ecommerce/ecommerce.routes')},
                {path: 'file-manager', loadChildren: () => import('@modules/admin/apps/file-manager/file-manager.routes')},
                {path: 'help-center', loadChildren: () => import('@modules/admin/apps/help-center/help-center.routes')},
                {path: 'mailbox', loadChildren: () => import('@modules/admin/apps/mailbox/mailbox.routes')},
                {path: 'notes', loadChildren: () => import('@modules/admin/apps/notes/notes.routes')},
                {path: 'scrumboard', loadChildren: () => import('@modules/admin/apps/scrumboard/scrumboard.routes')},
                {path: 'tasks', loadChildren: () => import('@modules/admin/apps/tasks/tasks.routes')},
            ]},

            // Pages
            {path: 'pages', children: [

                // Activities
                {path: 'activities', loadChildren: () => import('@modules/admin/pages/activities/activities.routes')},

                // Authentication
                {path: 'authentication', loadChildren: () => import('@modules/admin/pages/authentication/authentication.routes')},

                // Error
                {path: 'error', children: [
                    {path: '404', loadChildren: () => import('@modules/admin/pages/error/error-404/error-404.routes')},
                    {path: '500', loadChildren: () => import('@modules/admin/pages/error/error-500/error-500.routes')}
                ]},

                // Invoice
                {path: 'invoice', children: [
                    {path: 'printable', children: [
                        {path: 'compact', loadChildren: () => import('@modules/admin/pages/invoice/printable/compact/compact.routes')},
                        {path: 'modern', loadChildren: () => import('@modules/admin/pages/invoice/printable/modern/modern.routes')}
                    ]}
                ]},

                // Maintenance
                {path: 'maintenance', loadChildren: () => import('@modules/admin/pages/maintenance/maintenance.routes')},

                // Pricing
                {path: 'pricing', children: [
                    {path: 'modern', loadChildren: () => import('@modules/admin/pages/pricing/modern/modern.routes')},
                    {path: 'simple', loadChildren: () => import('@modules/admin/pages/pricing/simple/simple.routes')},
                    {path: 'single', loadChildren: () => import('@modules/admin/pages/pricing/single/single.routes')},
                    {path: 'table', loadChildren: () => import('@modules/admin/pages/pricing/table/table.routes')}
                ]},

                // Profile
                {path: 'profile', loadChildren: () => import('@modules/admin/pages/profile/profile.routes')},

                // Settings
                {path: 'settings', loadChildren: () => import('@modules/admin/pages/settings/settings.routes')},
            ]},

            // User Interface
            {path: 'ui', children: [

                // Material Components
                {path: 'material-components', loadChildren: () => import('@modules/admin/ui/material-components/material-components.routes')},

                // Fuse Components
                {path: 'fuse-components', loadChildren: () => import('@modules/admin/ui/fuse-components/fuse-components.routes')},

                // Other Components
                {path: 'other-components', loadChildren: () => import('@modules/admin/ui/other-components/other-components.routes')},

                // TailwindCSS
                {path: 'tailwindcss', loadChildren: () => import('@modules/admin/ui/tailwindcss/tailwindcss.routes')},

                // Advanced Search
                {path: 'advanced-search', loadChildren: () => import('@modules/admin/ui/advanced-search/advanced-search.routes')},

                // Animations
                {path: 'animations', loadChildren: () => import('@modules/admin/ui/animations/animations.routes')},

                 // Cards
                {path: 'cards', loadChildren: () => import('@modules/admin/ui/cards/cards.routes')},

                // Colors
                {path: 'colors', loadChildren: () => import('@modules/admin/ui/colors/colors.routes')},

                // Confirmation Dialog
                {path: 'confirmation-dialog', loadChildren: () => import('@modules/admin/ui/confirmation-dialog/confirmation-dialog.routes')},

                // Datatable
                {path: 'datatable', loadChildren: () => import('@modules/admin/ui/datatable/datatable.routes')},

                // Forms
                {path: 'forms', loadChildren: () => import('@modules/admin/ui/forms/forms.routes')},

                // Icons
                {path: 'icons', loadChildren: () => import('@modules/admin/ui/icons/icons.routes')},

                // Page Layouts
                {path: 'page-layouts', loadChildren: () => import('@modules/admin/ui/page-layouts/page-layouts.routes')},

                // Typography
                {path: 'typography', loadChildren: () => import('@modules/admin/ui/typography/typography.routes')}
            ]},

            // Documentation
            {path: 'docs', children: [

                // Changelog
                {path: 'changelog', loadChildren: () => import('@modules/admin/docs/changelog/changelog.routes')},

                // Guides
                {path: 'guides', loadChildren: () => import('@modules/admin/docs/guides/guides.routes')}
            ]},

            // 404 & Catch all
            {path: '404-not-found', pathMatch: 'full', loadChildren: () => import('@modules/admin/pages/error/error-404/error-404.routes')},
            {path: '**', redirectTo: '404-not-found'}
        ]
    }
];
