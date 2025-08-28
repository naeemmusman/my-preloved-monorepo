import { Routes } from '@angular/router';
import { ConfirmationRequiredClassicComponent } from '@modules/admin/pages/authentication/confirmation-required/classic/confirmation-required.component';
import { ConfirmationRequiredFullscreenReversedComponent } from '@modules/admin/pages/authentication/confirmation-required/fullscreen-reversed/confirmation-required.component';
import { ConfirmationRequiredFullscreenComponent } from '@modules/admin/pages/authentication/confirmation-required/fullscreen/confirmation-required.component';
import { ConfirmationRequiredModernReversedComponent } from '@modules/admin/pages/authentication/confirmation-required/modern-reversed/confirmation-required.component';
import { ConfirmationRequiredModernComponent } from '@modules/admin/pages/authentication/confirmation-required/modern/confirmation-required.component';
import { ConfirmationRequiredSplitScreenReversedComponent } from '@modules/admin/pages/authentication/confirmation-required/split-screen-reversed/confirmation-required.component';
import { ConfirmationRequiredSplitScreenComponent } from '@modules/admin/pages/authentication/confirmation-required/split-screen/confirmation-required.component';
import { ForgotPasswordClassicComponent } from '@modules/admin/pages/authentication/forgot-password/classic/forgot-password.component';
import { ForgotPasswordFullscreenReversedComponent } from '@modules/admin/pages/authentication/forgot-password/fullscreen-reversed/forgot-password.component';
import { ForgotPasswordFullscreenComponent } from '@modules/admin/pages/authentication/forgot-password/fullscreen/forgot-password.component';
import { ForgotPasswordModernReversedComponent } from '@modules/admin/pages/authentication/forgot-password/modern-reversed/forgot-password.component';
import { ForgotPasswordModernComponent } from '@modules/admin/pages/authentication/forgot-password/modern/forgot-password.component';
import { ForgotPasswordSplitScreenReversedComponent } from '@modules/admin/pages/authentication/forgot-password/split-screen-reversed/forgot-password.component';
import { ForgotPasswordSplitScreenComponent } from '@modules/admin/pages/authentication/forgot-password/split-screen/forgot-password.component';
import { ResetPasswordClassicComponent } from '@modules/admin/pages/authentication/reset-password/classic/reset-password.component';
import { ResetPasswordFullscreenReversedComponent } from '@modules/admin/pages/authentication/reset-password/fullscreen-reversed/reset-password.component';
import { ResetPasswordFullscreenComponent } from '@modules/admin/pages/authentication/reset-password/fullscreen/reset-password.component';
import { ResetPasswordModernReversedComponent } from '@modules/admin/pages/authentication/reset-password/modern-reversed/reset-password.component';
import { ResetPasswordModernComponent } from '@modules/admin/pages/authentication/reset-password/modern/reset-password.component';
import { ResetPasswordSplitScreenReversedComponent } from '@modules/admin/pages/authentication/reset-password/split-screen-reversed/reset-password.component';
import { ResetPasswordSplitScreenComponent } from '@modules/admin/pages/authentication/reset-password/split-screen/reset-password.component';
import { SignInClassicComponent } from '@modules/admin/pages/authentication/sign-in/classic/sign-in.component';
import { SignInFullscreenReversedComponent } from '@modules/admin/pages/authentication/sign-in/fullscreen-reversed/sign-in.component';
import { SignInFullscreenComponent } from '@modules/admin/pages/authentication/sign-in/fullscreen/sign-in.component';
import { SignInModernReversedComponent } from '@modules/admin/pages/authentication/sign-in/modern-reversed/sign-in.component';
import { SignInModernComponent } from '@modules/admin/pages/authentication/sign-in/modern/sign-in.component';
import { SignInSplitScreenReversedComponent } from '@modules/admin/pages/authentication/sign-in/split-screen-reversed/sign-in.component';
import { SignInSplitScreenComponent } from '@modules/admin/pages/authentication/sign-in/split-screen/sign-in.component';
import { SignOutClassicComponent } from '@modules/admin/pages/authentication/sign-out/classic/sign-out.component';
import { SignOutFullscreenReversedComponent } from '@modules/admin/pages/authentication/sign-out/fullscreen-reversed/sign-out.component';
import { SignOutFullscreenComponent } from '@modules/admin/pages/authentication/sign-out/fullscreen/sign-out.component';
import { SignOutModernReversedComponent } from '@modules/admin/pages/authentication/sign-out/modern-reversed/sign-out.component';
import { SignOutModernComponent } from '@modules/admin/pages/authentication/sign-out/modern/sign-out.component';
import { SignOutSplitScreenReversedComponent } from '@modules/admin/pages/authentication/sign-out/split-screen-reversed/sign-out.component';
import { SignOutSplitScreenComponent } from '@modules/admin/pages/authentication/sign-out/split-screen/sign-out.component';
import { SignUpClassicComponent } from '@modules/admin/pages/authentication/sign-up/classic/sign-up.component';
import { SignUpFullscreenReversedComponent } from '@modules/admin/pages/authentication/sign-up/fullscreen-reversed/sign-up.component';
import { SignUpFullscreenComponent } from '@modules/admin/pages/authentication/sign-up/fullscreen/sign-up.component';
import { SignUpModernReversedComponent } from '@modules/admin/pages/authentication/sign-up/modern-reversed/sign-up.component';
import { SignUpModernComponent } from '@modules/admin/pages/authentication/sign-up/modern/sign-up.component';
import { SignUpSplitScreenReversedComponent } from '@modules/admin/pages/authentication/sign-up/split-screen-reversed/sign-up.component';
import { SignUpSplitScreenComponent } from '@modules/admin/pages/authentication/sign-up/split-screen/sign-up.component';

export default [
    // Sign in
    {
        path: 'sign-in',
        children: [
            {
                path: 'classic',
                component: SignInClassicComponent,
            },
            {
                path: 'modern',
                component: SignInModernComponent,
            },
            {
                path: 'modern-reversed',
                component: SignInModernReversedComponent,
            },
            {
                path: 'split-screen',
                component: SignInSplitScreenComponent,
            },
            {
                path: 'split-screen-reversed',
                component: SignInSplitScreenReversedComponent,
            },
            {
                path: 'fullscreen',
                component: SignInFullscreenComponent,
            },
            {
                path: 'fullscreen-reversed',
                component: SignInFullscreenReversedComponent,
            },
        ],
    },
    // Sign up
    {
        path: 'sign-up',
        children: [
            {
                path: 'classic',
                component: SignUpClassicComponent,
            },
            {
                path: 'modern',
                component: SignUpModernComponent,
            },
            {
                path: 'modern-reversed',
                component: SignUpModernReversedComponent,
            },
            {
                path: 'split-screen',
                component: SignUpSplitScreenComponent,
            },
            {
                path: 'split-screen-reversed',
                component: SignUpSplitScreenReversedComponent,
            },
            {
                path: 'fullscreen',
                component: SignUpFullscreenComponent,
            },
            {
                path: 'fullscreen-reversed',
                component: SignUpFullscreenReversedComponent,
            },
        ],
    },
    // Sign out
    {
        path: 'sign-out',
        children: [
            {
                path: 'classic',
                component: SignOutClassicComponent,
            },
            {
                path: 'modern',
                component: SignOutModernComponent,
            },
            {
                path: 'modern-reversed',
                component: SignOutModernReversedComponent,
            },
            {
                path: 'split-screen',
                component: SignOutSplitScreenComponent,
            },
            {
                path: 'split-screen-reversed',
                component: SignOutSplitScreenReversedComponent,
            },
            {
                path: 'fullscreen',
                component: SignOutFullscreenComponent,
            },
            {
                path: 'fullscreen-reversed',
                component: SignOutFullscreenReversedComponent,
            },
        ],
    },
    // Forgot password
    {
        path: 'forgot-password',
        children: [
            {
                path: 'classic',
                component: ForgotPasswordClassicComponent,
            },
            {
                path: 'modern',
                component: ForgotPasswordModernComponent,
            },
            {
                path: 'modern-reversed',
                component: ForgotPasswordModernReversedComponent,
            },
            {
                path: 'split-screen',
                component: ForgotPasswordSplitScreenComponent,
            },
            {
                path: 'split-screen-reversed',
                component: ForgotPasswordSplitScreenReversedComponent,
            },
            {
                path: 'fullscreen',
                component: ForgotPasswordFullscreenComponent,
            },
            {
                path: 'fullscreen-reversed',
                component: ForgotPasswordFullscreenReversedComponent,
            },
        ],
    },
    // Reset password
    {
        path: 'reset-password',
        children: [
            {
                path: 'classic',
                component: ResetPasswordClassicComponent,
            },
            {
                path: 'modern',
                component: ResetPasswordModernComponent,
            },
            {
                path: 'modern-reversed',
                component: ResetPasswordModernReversedComponent,
            },
            {
                path: 'split-screen',
                component: ResetPasswordSplitScreenComponent,
            },
            {
                path: 'split-screen-reversed',
                component: ResetPasswordSplitScreenReversedComponent,
            },
            {
                path: 'fullscreen',
                component: ResetPasswordFullscreenComponent,
            },
            {
                path: 'fullscreen-reversed',
                component: ResetPasswordFullscreenReversedComponent,
            },
        ],
    },
    // Confirmation required
    {
        path: 'confirmation-required',
        children: [
            {
                path: 'classic',
                component: ConfirmationRequiredClassicComponent,
            },
            {
                path: 'modern',
                component: ConfirmationRequiredModernComponent,
            },
            {
                path: 'modern-reversed',
                component: ConfirmationRequiredModernReversedComponent,
            },
            {
                path: 'split-screen',
                component: ConfirmationRequiredSplitScreenComponent,
            },
            {
                path: 'split-screen-reversed',
                component: ConfirmationRequiredSplitScreenReversedComponent,
            },
            {
                path: 'fullscreen',
                component: ConfirmationRequiredFullscreenComponent,
            },
            {
                path: 'fullscreen-reversed',
                component: ConfirmationRequiredFullscreenReversedComponent,
            },
        ],
    },
] as Routes;
