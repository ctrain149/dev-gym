import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Product } from './product.model';
import { ProductService } from '../../services/product.service';
import { ProductFormDialogComponent } from '../../dialogs/product-form-dialog/product-form-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  displayedColumns = [
    'name',
    'category',
    'price',
    'stock',
    'active',
    'actions',
  ];
  loading = true;
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;

    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products.';
        this.loading = false;
        console.error(err);
      },
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(ProductFormDialogComponent, {
      width: '520px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.create(result).subscribe({
          next: (created) => {
            this.snackBar.open(
              `"${created.name}" created successfully!`,
              'Dismiss',
              {
                duration: 4000,
                panelClass: 'snackbar-success',
              },
            );
            this.loadProducts();
          },
          error: (err) => {
            console.error(err);
            this.snackBar.open(
              'Failed to create product. Please try again.',
              'Dismiss',
              {
                duration: 5000,
                panelClass: 'snackbar-error',
              },
            );
          },
        });
      }
    });
  }

  openEditDialog(product: Product): void {
    const dialogRef = this.dialog.open(ProductFormDialogComponent, {
      width: '520px',
      data: product,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.update(product.id, result).subscribe({
          next: (updated) => {
            this.snackBar.open(
              `"${updated.name}" updated successfully!`,
              'Dismiss',
              { duration: 4000, panelClass: 'snackbar-success' },
            );
            this.loadProducts();
          },
          error: (err) => {
            console.error(err);
            this.snackBar.open(
              'Failed to update product. Please try again.',
              'Dismiss',
              { duration: 5000, panelClass: 'snackbar-error' },
            );
          },
        });
      }
    });
  }

  deleteProduct(product: Product): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { name: product.name },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.productService.delete(product.id).subscribe({
          next: () => {
            this.snackBar.open(
              `"${product.name}" deleted successfully.`,
              'Dismiss',
              { duration: 4000, panelClass: 'snackbar-success' },
            );
            this.loadProducts();
          },
          error: (err) => {
            console.error(err);
            this.snackBar.open(
              'Failed to delete product. Please try again.',
              'Dismiss',
              { duration: 5000, panelClass: 'snackbar-error' },
            );
          },
        });
      }
    });
  }
}
