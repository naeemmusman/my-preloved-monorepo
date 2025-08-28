import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Buffer } from "buffer";
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, catchError, map, Observable, take, tap, throwError } from 'rxjs';

import { environment } from '@env/environment.development';
import { DataService } from '@modules/shared/services/data.service';
import { SignUpRequest, SignUpResponse } from '@modules/shared/type/signup';

export interface Address {
  building: string;
  street: string;
  town: string;
  county: string;
  postcode: string;
}

export type AddressFormGroup =  FormGroup<{
    building: FormControl<string>;
    street: FormControl<string>;
    town: FormControl<string>;
    county: FormControl<string | null>;
    postcode: FormControl<string>;
  } | null>;

export interface User {
  firstName: string;
  middleName: string;
  lastName: string;
  displayName: string;
  dateOfBirth: Date;
  username: string;
  email: string;
  phone: string;
  avatar?: any;
  avatarMimeType?: string;
  role: string;
  address: Address;
  isDefaultAvatar: boolean;
}


export type UpdateUserProfileRequest = Omit<User, 'dateOfBirth' | 'username' | 'email' | 'role' | 'avatarMimeType'>;

export type UpdateUserProfileFormGroup = FormGroup<{
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  middleName: FormControl<string>;
  displayName: FormControl<string>;
  dateOfBirth: FormControl<Date | null>;
  phone: FormControl<string>;
  address: FormControl<Address | null>;
}>;

export interface AvatarUploadResponse { message: string; avatar: any; avatarMimeType: string; isDefaultAvatar: boolean; };

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn$$ = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedIn$$.asObservable();
  

  private authUser$$ = new BehaviorSubject<User | null>(null);
  
  public get authUser$() : Observable<User | null> {
    return this.authUser$$.asObservable();
  }

  public avatarURL$ = this.authUser$.pipe(
    map(user => (this.createAvatarBlob(user?.avatar?.data, user?.avatarMimeType)  || null))
  );


  public get authToken(): string | null {
    return localStorage.getItem(environment.authKey);
  }
  
  constructor(
    private router: Router,
    private api: DataService,
    private sanitizer: DomSanitizer,
  ) {
    // Check if the user is logged in on service initialization
    const token = this.authToken;
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const isTokenExpired = decodedToken.exp * 1000 < Date.now();
      
      this.isLoggedIn$$.next(decodedToken && !isTokenExpired);
      this.authUser$$.next(decodedToken.user);
    } else {
      this.logout();
    }
    
  }

  updateAuthUser(user: Partial<User>): void {
    this.authUser$$.next({ ...this.authUser$$.getValue(), ...user });
  }


  signIn(email: string, password: string): Observable<{ token: string }> {

    return this.api.postData<
      { email:string, password: string },
      { token: string }
    >(`auth/signin`, { email, password }).pipe(
      catchError(err => {
        console.log(err);
        return throwError(() => err.error);
      }),
      tap(({ token }) => {
        localStorage.setItem(environment.authKey, token);
        this.isLoggedIn$$.next(true);
        this.router.navigateByUrl('/dashboards/project');
      })
    );
  }

  getProfile(): Observable<User> {
    return this.api.getData<User>(`/auth/profile`).pipe(
      take(1),
      catchError(err => {
        console.error(`Error fetching user profile: `, err);
        return throwError(() => err.error);
      }),
      tap(user => this.authUser$$.next(user))
    );  
  }

  uploadAvatar(file: File): Observable<AvatarUploadResponse> {
    const formData = new FormData();
    formData.append('avatar', file, file.name);

    return this.api.postData<FormData, AvatarUploadResponse>(`/auth/profile/avatar`, formData).pipe(
      catchError(err => {
        console.error(`Error uploading avatar: `, err);
        return throwError(() => err.error);
      }),
      tap(({ message, avatar, avatarMimeType, isDefaultAvatar }) => this.authUser$$.next({ ...this.authUser$$.getValue(), avatar, avatarMimeType, isDefaultAvatar }))
    );
  }

  // deleteAvatar(): Observable<AvatarUploadResponse> {
  //   return this.api.deleteData<AvatarUploadResponse>(`/auth/profile/avatar`).pipe(
  //     catchError(err => {
  //       console.error(`Error deleting avatar: `, err);
  //       return throwError(() => err.error);
  //     }),
  //     tap(({ message, avatar, avatarMimeType, isDefaultAvatar }) => this.authUser$$.next({ ...this.authUser$$.getValue(), avatar, avatarMimeType, isDefaultAvatar }))
  //   );
  // }


  /**
   * Update user profile
   */

  updateProfile(user: Partial<User>): Observable<User> {
    return this.api.putData<Partial<User>, User>(`/auth/profile`, user).pipe(
      take(1),
      catchError(err => {
        console.error(`Error fetching user profile: `, err);
        return throwError(() => err.error);
      }),
      tap(user => {
          this.authUser$$.next(user);
          // console.log('User profile updated successfully', user);
        } 
        )
    );  
  }

  signUp(payload: SignUpRequest): Observable<SignUpResponse> {
    return this.api.postData<SignUpRequest, SignUpResponse>(`/auth/signup`, payload).pipe(
      take(1),
      catchError(err => {
        console.error(`Error during sign up: `, err);
        return throwError(() => err.error);
      })
    );
  }

  resetPassword( email: string): Observable<void> {
    return this.api.postData<{ email: string }, void>(`/auth/reset-password`, { email }).pipe(
      take(1),
      catchError(err => {
        console.error(`Error during password reset: `, err);
        return throwError(() => err.error);
      })
    );
  }

  forgotPassword(email: string): Observable<void> {
    return this.api.postData<{ email: string }, void>(`/auth/forgot-password`, { email }).pipe(
      take(1),
      catchError(err => {
        console.error(`Error during forgot password: `, err);
        return throwError(() => err.error);
      })
    );
  }
  unlockSession(payload: { email: string, password: string }): Observable<void> {
    return this.api.postData<{ email: string, password: string }, void>(`/auth/unlock-session`, payload).pipe(
      take(1),
      catchError(err => {
        console.error(`Error during session unlock: `, err);
        return throwError(() => err.error);
      }),
      tap(() => {
        this.router.navigateByUrl('/dashboards/project');      
      }));
    }

    
  logout(){
    localStorage.removeItem(environment.authKey);
    this.isLoggedIn$$.next(false);
    this.authUser$$.next(null);
    this.router.navigateByUrl('/login');
  }

  private createAvatarBlob(avatarData: Buffer, mimeType = 'image/jpeg'): SafeUrl {

    console.log(`Creating avatar mimeType:`, mimeType);
    

    const byteArray = new Uint8Array(avatarData);
    const blob = new Blob([byteArray], { type: mimeType });
    const objectUrl = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustUrl(objectUrl);
  }

}


export function matchPasswords(passwordKey: string, confirmKey: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get(passwordKey)?.value;
    const confirmPassword = formGroup.get(confirmKey)?.value;
    
    if (password !== confirmPassword) {
      formGroup.get(confirmKey)?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    if (formGroup.get(confirmKey)?.hasError('passwordMismatch')) {
      formGroup.get(confirmKey)?.setErrors({ passwordMismatch: null });
    }
    
    return null;
  };
}