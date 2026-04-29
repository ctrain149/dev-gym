import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'feed',
    loadComponent: () =>
      import('./feed/feed.component').then((m) => m.FeedComponent),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./products/products.component').then((m) => m.ProductsComponent),
  },
];
