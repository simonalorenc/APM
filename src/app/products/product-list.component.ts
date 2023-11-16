import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product List'
  imageWidth: number = 50
  imageMargin: number = 2
  showImage: boolean = false
  errorMessage: string = ''
  sub!: Subscription

  private _listFilter: string = ''
  get listFilter(): string {
    return this._listFilter
  }
  set listFilter(value: string) {
    this._listFilter = value
    console.log('In setter: ', value)
    this.filteredProducts = this.performFilter(value)
  }
  
  filteredProducts: IProduct[] = []
  products: IProduct[] = []

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    console.log('ssssss')
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        console.log('fffff')
        this.products = products
        this.filteredProducts = this.products
      },
      error: err => this.errorMessage = err
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase()
    return this.products.filter((product: IProduct) => 
      product.productName.toLocaleLowerCase().includes(filterBy))
  }

  toggleImage(): void {
    this.showImage = !this.showImage
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product list: ' + message
  }
}
