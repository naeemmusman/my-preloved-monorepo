import { TextFieldModule } from '@angular/cdk/text-field';
import { DatePipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { filter, switchMap, tap } from 'rxjs';

import { InfoBlockComponent } from '@common/components/info-block/info-block.component';
import { AddressFormatterDirective } from '@common/directives/address-formater.directive';
import { FuseCardComponent } from '@fuse/components/card';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from '@modules/auth/services/auth.service';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FuseCardComponent,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        TextFieldModule,
        MatDividerModule,
        MatTooltipModule,
        DatePipe,
        InfoBlockComponent,
        AddressFormatterDirective,
    ],
})
export class ProfileComponent {

    private authservice: AuthService = inject(AuthService);
    user$$ = toSignal(this.authservice.authUser$);
    avatarUrl$$ = toSignal(this.authservice.avatarURL$);

    constructor(
        private matDialog: MatDialog,
         private _fuseConfirmationService: FuseConfirmationService
    ) {}

    openUpdateProfileDialog(): void {
        const dialogRef = this.matDialog.open(UpdateProfileComponent, {
            width: '600px',
            data: {
                user: this.user$$(),
            },
            disableClose: true,
        });

        dialogRef.afterClosed().subscribe((payload) => {
            if (payload) {
                // If the dialog was closed with a result, update the user data
                // this.authservice.updateUserProfile(payload);
                console.log('Profile updated with payload:', payload);
                
            }
        });
    }

    onFileSelected(event: Event): void {

        const input = event.target as HTMLInputElement;

        if (input.files && input.files.length > 0) {
            const file = input.files[0];

            // If you want to preview:
            // const reader = new FileReader();
            // reader.onload = () => {
            //     console.log('Image preview URL:', reader.result);
            // };
            // reader.readAsDataURL(file);


            this.authservice.uploadAvatar(file)
                .subscribe((data)=>{
                    // console.log('Avatar uploaded successfully', data);
                }, (error) => {
                    console.error('Error uploading avatar:', error);
                });
        }
    }

    resetAvatar(): void {
        const dialogRef = this._fuseConfirmationService.open(
            {
                title: 'Reset Avatar',
                message: 'Are you sure you want to reset your avatar to default icon?',
                actions: {
                    confirm: {
                        label: 'Confirm',
                        color: 'accent'
                    },
                    cancel: {
                        label: 'Cancel'
                    }
                },
                icon: {
                    show: true,
                    name: 'heroicons_outline:question-mark-circle',
                    color: 'info'
                },
                dismissible: true
            }
        );

        // Subscribe to afterClosed from the dialog reference
        dialogRef.afterClosed().pipe(
            filter(result => result === 'confirmed'),
            switchMap(() => this.authservice.updateProfile({
                avatar: null,
                avatarMimeType: "image/jpg",
            })),
            tap((user) => this.authservice.updateAuthUser(user)) // Update the user in the service
        ).subscribe();
    }

}
