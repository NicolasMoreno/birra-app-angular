import {Component, OnInit} from "@angular/core";
import {Product} from "../../products/model/product";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../shared/product.service";
import {OrderService} from "../../../shared/order.service";

@Component({
  selector: 'app-new-order-component',
  templateUrl: './new-order.component.html'
})
export class NewOrderComponent implements OnInit {

  productList: Product[] = [];

  newOrderForm: FormGroup;

  constructor(private readonly productService: ProductService,
              private readonly orderService: OrderService,
              private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe( (products: Product[]) => this.productList = products);
    this.buildOrderForm();
  }

  private buildOrderForm() {
    this.newOrderForm = this.fb.group({
      productId: this.fb.control('', [Validators.required]),
      orderAmount: this.fb.control('', [Validators.required, this.verifyOnlyInteger]),
      description: this.fb.control('', [Validators.required, Validators.maxLength(50)])
    });
  }

  private verifyOnlyInteger(control: AbstractControl) {
    const value: number = control.value;
    if (Number.isInteger(value)) return null;
    else return {nonInteger: "Número no es entero"};
  }

  onSubmitButton() {
    console.log(this.newOrderForm);
    this.productService.checkProductAvailability(this.newOrderForm.getRawValue()).subscribe( (isAble) => {
      if (isAble) {
        this.orderService.submitNewOrder(this.newOrderForm.getRawValue()).subscribe( (result) => {
        console.log(result);
      }, error => console.error(error));
      } else {
        // TODO saltar error
      }
    });
  }
}
