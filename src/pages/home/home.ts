import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  products: Array<Product>;
  productsSub: Subscription;
  constructor(
    public navCtrl: NavController,
    private service: ProductService
  ) {
  }

  ionViewDidLoad(): void {
    this.getProducts();
  }

  ionViewDidLeave(): void {
    if (!!this.productsSub) { this.productsSub.unsubscribe(); }
  }

  getProducts(): void {
    this.productsSub = this.service.getProducts()
      .subscribe((res: Array<Product>) => {
        this.products = res;
      }, (err: any) => {
        console.error(err);
      })
  }

  removeProduct(index: number) {
    this.service.deleteProduct(this.products[index].id);
  }

}
