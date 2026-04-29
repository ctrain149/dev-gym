import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  displayedColumns = ['name', 'category', 'price', 'stock', 'active'];
  loading = true;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
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
}
