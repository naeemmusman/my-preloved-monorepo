import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RouterLink } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import { FuseAlertComponent, FuseAlertType } from "@fuse/components/alert";
import { environment } from '@env/environment.development';
import { finalize } from "rxjs";
import { AuthService } from "../services/auth.service";

const { credentials } = environment;

@Component({
    selector: 'app-login',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    imports: [
        RouterLink,
        FuseAlertComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
    ],
})
export class AuthSignInComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    loading = false;
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    showAlert = false;

    // @ViewChild('signInNgForm') signInNgForm: NgForm;


    /**
     * Constructor
     */
    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
            password: ['', Validators.required],
            rememberMe: [false],
          });
      
          // Pre-fill the form with credentials from environment
          if (credentials) {
            this.loginForm.patchValue(credentials);
          }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.loginForm.valueChanges
      .subscribe(() => {
        // Reset the alert when form changes
        this.showAlert = false;
        this.loginForm.markAsPristine();
        this.loginForm.markAsUntouched();
        this.submitted = false;
      });
    }

    get f() {
        return this.loginForm.controls;
    }
    
    onSubmit() {
        this.submitted = true;
         

        // Hide the alert
        this.showAlert = false;
        if (this.loginForm.valid) {
          // Disable the form
          this.loginForm.disable();
          const { email, password } = this.loginForm.value;
          this.loading = true;
          this.authService.signIn(email, password)
            .pipe(
              finalize(() => this.loading = false)
            )
            .subscribe(({ token }) => {
              // console.log('Login successful', token);

              // const redirectURL =
              //       this._activatedRoute.snapshot.queryParamMap.get(
              //           'redirectURL'
              //       ) || '/signed-in-redirect';

              //   // Navigate to the redirect url
              //   this._router.navigateByUrl(redirectURL);

            }, ({ message, notification = 'error',validationErrors }) => {
              // console.log('Login failed', message, validationErrors, notification);
              
              // Set the alert
              this.alert = {
                  type: notification,
                  message: validationErrors ? validationErrors[0].message : message,
              };
              // Re-enable the form
              this.loginForm.enable();
              // Show the alert
              this.showAlert = true;

            });
        }
      }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
     signIn(): void {
    //     // Return if the form is invalid
    //     if (this.signInForm.invalid) {
    //         return;
    //     }

    //     // Disable the form
    //     this.signInForm.disable();

    //     // Hide the alert
    //     this.showAlert = false;

    //   // Sign in
    //     this._authService.signIn(this.signInForm.value).subscribe(
    //         () => {
    //             // Set the redirect url.
    //             // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
    //             // to the correct page after a successful sign in. This way, that url can be set via
    //             // routing file and we don't have to touch here.
    //             const redirectURL =
    //                 this._activatedRoute.snapshot.queryParamMap.get(
    //                     'redirectURL'
    //                 ) || '/signed-in-redirect';

    //             // Navigate to the redirect url
    //             this._router.navigateByUrl(redirectURL);
    //         },
    //         (response) => {
    //             // Re-enable the form
    //             this.signInForm.enable();

    //             // Reset the form
    //             this.signInNgForm.resetForm();

    //             // Set the alert
    //             this.alert = {
    //                 type: 'error',
    //                 message: 'Wrong email or password',
    //             };

    //             // Show the alert
    //             this.showAlert = true;
    //         }
    //     );
    }
}
