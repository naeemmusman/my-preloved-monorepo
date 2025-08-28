import { BooleanInput } from '@angular/cdk/coercion';
import { NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
    OnDestroy,
    ViewEncapsulation
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'user',
    imports: [
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        NgClass,
        MatDividerModule,
    ],
})
export class UserComponent implements OnDestroy {

    private authservice = inject(AuthService);


    static ngAcceptInputType_showAvatar: BooleanInput;

    @Input() showAvatar = true;

    user$$ = toSignal(this.authservice.authUser$);
    avatarUrl$$ = toSignal(this.authservice.avatarURL$);

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private router: Router
    ) {}


    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    updateUserStatus(status: string): void {
        // Return if user is not available
        // if (!this.user) {
        //     return;
        // }

        // // Update the user
        // this._userService
        //     .update({
        //         ...this.user,
        //         status,
        //     })
        //     .subscribe();
    }

    signOut(): void {
        this.authservice.logout();
    }

    loadProfile(): void {
        this.router.navigate(['/profile']);
    }
}
