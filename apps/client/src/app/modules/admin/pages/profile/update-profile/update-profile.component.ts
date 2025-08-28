import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AddressFormComponent } from '@common/components/address-form/address-form.component';
import { Address, AddressFormGroup, UpdateUserProfileFormGroup, UpdateUserProfileRequest, User } from '@modules/auth/services/auth.service';

@Component({
    selector: 'update-profile',
    templateUrl: './update-profile.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatButtonModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        AddressFormComponent
    ],
})
export class UpdateProfileComponent {

    form: UpdateUserProfileFormGroup  = new FormGroup({
        firstName: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
        middleName: new FormControl('', [Validators.minLength(3), Validators.maxLength(15)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
        displayName:  new FormControl('', [ Validators.minLength(3), Validators.maxLength(15)]),
        phone: new FormControl('', [Validators.pattern(/^\+?[1-9]\d{1,14}$/)]),
        dateOfBirth: new FormControl(null, [Validators.required]),
        address: new FormControl<Address | null>(null, [Validators.required]),
    });

    submitted = false;
    showAlert = false;

    /**
     * Constructor
     */
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { user: User },
        public matDialogRef: MatDialogRef<UpdateProfileComponent>,      
    ) {
        if(data && data.user) {
            this.form.patchValue(data.user);
        }
    }

    get f() {
      return this.form.controls;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Save the profile changes
     */
    onSubmit(event?: KeyboardEvent): void {
        if (event && event.key !== 'Enter') {
            return; // Only proceed if the Enter key was pressed
        }
        
        if (this.form.valid) {
    
            this.submitted = true;
            console.log('Form submitted:', this.form.controls.address.dirty);
            

            const payload =  Object.keys(this.form.controls)
                .filter(key =>  this.form.controls[key].dirty )
                .reduce((obj, key) => {
                    obj[key] = this.form.controls[key].value;
                    return obj;
                }, {} as UpdateUserProfileRequest);








                this.matDialogRef.close(payload);
        }
    }

    /**
     * close
     */
    close(): void { this.matDialogRef.close(); }
}
