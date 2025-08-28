import { Directive, Host, HostBinding, Input, OnChanges } from '@angular/core';
import { Address } from '@modules/auth/services/auth.service';

@Directive({
  selector: '[appAddressFormatter]',
})
export class AddressFormatterDirective implements OnChanges { 
  
  @Input('appAddressFormatter') address: Address;
  @HostBinding('innerHTML') formatedAddress = '';

  ngOnChanges(): void {
    if (this.address) {
      this.formatedAddress = this.formatAddress(this.address);
    }
  }

  /** * Formats the address into a string.
   * @param address The address object to format.
   * @returns A formatted address string.
   */
  private formatAddress(address: Address): string {
    if (!address) {
      return '';
    }

    const { building, street, town, county, postcode } = address;
    const parts = [];
    parts.push(`${building} ${street}`);
    parts.push(`${town} ${county}`);
    parts.push(postcode);

    return parts.join('<br>');    
  }
}
