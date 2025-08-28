import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@core/user/user.types';
import { DataService } from '@modules/shared/services/data.service';
import { catchError, map, Observable, ReplaySubject, take, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    // private _httpClient = inject(HttpClient);
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

    /**
     *
     */
    constructor(
        private http: HttpClient,
        private api: DataService
) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User) {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current signed-in user data
     */
    get(): Observable<User> {
        return this.http.get<User>('api/common/user').pipe(
            tap((user) => {
                this._user.next(user);
            })
        );
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any> {
        return this.http.patch<User>('api/common/user', { user }).pipe(
            map((response) => {
                this._user.next(response);
            })
        );
    }

    getUserInfo(): Observable<User> {
        return this.api.getData<User>('/auth/profile').pipe(
            take(1),
    
            catchError(err => {
            console.error(`Error getting User Info: `, err);
            return throwError(() => err.error);
            })
        );
    // return this.http.get<User>('/api/user');
  }
}
