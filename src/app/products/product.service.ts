import { Injectable } from '@angular/core';
import { IProduct } from './product';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productUrl = 'assets/products/products.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap((data) => console.log('All', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getProduct(id: number): Observable<IProduct | undefined> {
    if (id === 0) {
      return of(this.initializeProduct());
    }
    const url = `${this.productUrl}`;
    return this.http.get<IProduct[]>(url).pipe(
        map(products => products.find(product => product.productId === id)),
        tap((data) => console.log('getProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(() => errorMessage);
  }

  createProduct(product: IProduct): Observable<IProduct> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    product.productId = null!;
    return this.http.post<IProduct>(this.productUrl, product, { headers }).pipe(
      tap((data) => console.log('createProduct: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteProduct(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productUrl}/${id}`;
    return this.http.delete<IProduct>(url, { headers }).pipe(
      tap((data) => console.log('deleteProduct: ' + id)),
      catchError(this.handleError)
    );
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productUrl}/${product.productId}`;
    return this.http.put<IProduct>(url, product, { headers }).pipe(
      tap(() => console.log('updateProduct: ' + product.productId)),
      // Return the product on an update
      map(() => product),
      catchError(this.handleError)
    );
  }

  private initializeProduct(): IProduct {
    // Return an initialized object
    return {
      productId: 0,
      productName: null!,
      productCode: null!,
      tags: [''],
      releaseDate: null!,
      price: null!,
      description: null!,
      starRating: null!,
      imageUrl: null!,
    };
  }
}
