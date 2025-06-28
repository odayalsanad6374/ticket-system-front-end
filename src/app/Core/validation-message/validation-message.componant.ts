import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="control?.touched && control?.errors" class="text-danger small mt-1">
      <div *ngIf="control?.errors?.['required']">This field is required.</div>
      <div *ngIf="control?.errors?.['email']">Please enter a valid email address.</div>
      <div *ngIf="control?.errors?.['min']">
        Minimum value is {{ control?.errors?.['min']?.min }}.
      </div>
      <div *ngIf="control?.errors?.['maxlength']">
        Maximum length is {{ control?.errors?.['maxlength']?.requiredLength }}.
      </div>
      <div *ngIf="control?.errors?.['minlength']">
        Minimum length is {{ control?.errors?.['minlength']?.requiredLength }} characters.
      </div>
      <div *ngIf="control?.errors?.['pattern']">Invalid format.</div>
      <div *ngIf="control?.errors?.['mustMatch']">Passwords do not match.</div>
    </div>
  `
})
export class ValidationMessageComponent {
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;

  get control(): AbstractControl | null {
    return this.formGroup?.get(this.controlName) ?? null;
  }
}