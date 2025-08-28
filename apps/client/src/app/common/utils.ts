import { AbstractControl, FormGroup, FormArray } from '@angular/forms';

export const getDirtyValues = (control: AbstractControl) => {
  if (control instanceof FormGroup) {
    const dirtyValues: any = {};
    Object.keys(control.controls).forEach(key => {
      const childControl = control.get(key);
      if (childControl && childControl.dirty) {
        const childDirtyValue = getDirtyValues(childControl);
        if (childDirtyValue !== undefined) {
          dirtyValues[key] = childDirtyValue;
        }
      }
    });
    return Object.keys(dirtyValues).length ? dirtyValues : undefined;
  }

  if (control instanceof FormArray) {
    const dirtyArray = control.controls
      .map((c, i) => getDirtyValues(c))
      .filter(v => v !== undefined);
    return dirtyArray.length ? dirtyArray : undefined;
  }

  // For FormControl
  return control.dirty ? control.value : undefined;
}
