import { Component, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Product } from '../../pages/products/product.model';

@Component({
  selector: 'app-product-form-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: './product-form-dialog.component.html',
  styleUrl: './product-form-dialog.component.scss',
})
export class ProductFormDialogComponent {
  form: FormGroup;
  isEdit: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductFormDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Product | null,
  ) {
    this.isEdit = !!data;
    this.form = this.fb.group({
      name: [data?.name ?? '', [Validators.required]],
      description: [data?.description ?? ''],
      price: [data?.price ?? null, [Validators.required, Validators.min(0)]],
      stock: [data?.stock ?? 0, [Validators.min(0)]],
      imageUrl: [data?.imageUrl ?? ''],
      category: [data?.category ?? '', [Validators.required]],
      active: [data?.active ?? true],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
