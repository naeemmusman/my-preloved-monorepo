import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { SignUpRequest } from '@modules/shared/type/signup';
import { finalize } from 'rxjs';
import { AuthService, matchPasswords } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    imports: [
        CommonModule,
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
export class AuthSignUpComponent implements OnInit {
   
  registerForm!: FormGroup;
  submitted = false;
  showAlert = false;
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  };

  loading = false;

  /**
   * Constructor
   */
  constructor(
      private authService: AuthService,
      private fb: FormBuilder,
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
      // Create the form
      this.registerForm = this.fb.group({
        firstName: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
        lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
        middleName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
        displayName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
        dateOfBirth: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
        phone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        address: this.fb.group({
          building: [''],
          street: [''],
          town: [''],
          county: [''],
          postcode: ['']
        })
      },{
        validators: matchPasswords('password', 'confirmPassword')
      });
    
      this.registerForm.valueChanges
    .subscribe(() => {
      // Reset the alert when form changes
      this.showAlert = false;
      this.registerForm.markAsPristine();
      this.registerForm.markAsUntouched();
      this.submitted = false;
    });
  }

    
    get f() {
      return this.registerForm.controls;
    }

    get address() {
      return (this.f['address'] as FormGroup ).controls ;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void {
        // Do nothing if the form is invalid
        // if (this.signUpForm.invalid) {
        //     return;
        // }

        // Disable the form
        this.registerForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign up
        // this.authService.signUp(this.signUpForm.value).subscribe(
        //     (response) => {
        //         // Navigate to the confirmation required page
        //         this._router.navigateByUrl('/confirmation-required');
        //     },
        //     (response) => {
        //         // Re-enable the form
        //         this.signUpForm.enable();

        //         // Reset the form
        //         this.signUpNgForm.resetForm();

        //         // Set the alert
        //         // this.alert = {
        //         //     type: 'error',
        //         //     message: 'Something went wrong, please try again.',
        //         // };

        //         // Show the alert
        //         // this.showAlert = true;
        //     }
        // );
    }


    onSubmit() {
    this.submitted = true;

     if (this.registerForm.valid) {
          // const {firstName,lastName, dateOfBirth, email, phone,  password, address } = this.registerForm.value;
          
        // Disable the form
        this.registerForm.disable();

        // Hide the alert
        this.showAlert = false;

        
          const payload = this.registerForm.value as SignUpRequest;

          console.log('Registering user', payload);
          
          this.authService.signUp(payload)
            .pipe(
              finalize(() => this.loading = false)
            )
            .subscribe((data)=>{
              console.log('Signup successfully', data);
              this.alert = {
                message: 'Registration successful! Please check your email for verification.',
                type:'success'
              };
                this.registerForm.enable();

            }, (error) => {
                // console.log('Signup failed', error);
                // Re-enable the form
                this.registerForm.enable();

                // Reset the form
                // this.registerForm.resetForm();

                if(error.error === 'BadRequestError' && error.validationErrors) {
                this.applyVlidationErrors(error.validationErrors);
                } 
                 // Set the alert
                this.alert = {
                  type: error.notification? error.notification : 'error',
                  message: error.validationErrors ? error.validationErrors[0].message : error.message,
                };
                // Show the alert
                this.showAlert = true;
            });
        }
  }

  private applyVlidationErrors(errors: {field: string, message: string}[]) {
    for (const {field, message} of errors) {
        console.log(`Applying validation error for field: ${field}, message: ${message}`);
        
      const control = this.registerForm.get(field);
      if (control) {
        control.setErrors({ server: message });
        control.markAsTouched();
      }
    }    
  }
}
