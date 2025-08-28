import { AfterViewInit, ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddressFormGroup } from '@modules/auth/services/auth.service';
import { Address } from '@modules/shared/type/signup';
import { debounceTime } from 'rxjs';


@Component({
  selector: 'app-address-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './address-form.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressFormComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressFormComponent implements ControlValueAccessor, AfterViewInit{

  addressForm: AddressFormGroup = new FormGroup({
    building: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
    street: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
    town: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
    county: new FormControl('', [Validators.minLength(1), Validators.maxLength(50)]),
    postcode: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z0-9 ]{2,10}$/)]),
  });
  private onChange: (value: Address) => void = () => {
    console.log('onChange');
    
  };
  private onTouched: () => void = () => {
    console.log('onTouched');
  };
  
  ngAfterViewInit(): void {
    this.addressForm.valueChanges.pipe(
      debounceTime(1500)
    ).subscribe(() => {
      this.onChange(this.addressForm.getRawValue());
    });
  }

  get f() {
    return this.addressForm.controls;
  }

  writeValue(value: Address): void {    
    if (value) {
      this.addressForm.patchValue(value);
    }
  }

  registerOnChange(fn: (value: Address) => void): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.addressForm.disable();
    } else {
      this.addressForm.enable();
    }
  }

 }
