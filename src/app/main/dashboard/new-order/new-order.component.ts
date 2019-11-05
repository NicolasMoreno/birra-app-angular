import {Component, OnInit} from "@angular/core";
import {Product} from "../../products/model/product";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../shared/product.service";
import {OrderService} from "../../../shared/order.service";
import {NbToastrService} from "@nebular/theme";
import {Order} from "../model/order";
import {Router} from "@angular/router";
import {ProductAvailability} from "../../products/model/product-availability";

@Component({
  selector: 'app-new-order-component',
  templateUrl: './new-order.component.html'
})
export class NewOrderComponent implements OnInit {

  productList: Product[] = [];
  maxProdAvailability: ProductAvailability[] = [];

  newOrderForm: FormGroup;

  constructor(private readonly productService: ProductService,
              private readonly orderService: OrderService,
              private readonly fb: FormBuilder,
              private readonly toastrService: NbToastrService,
              private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe((products: Product[]) => {
      this.productList = products;
      this.getAllMaxProductAvailability(this.productList);
    });
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
    this.productService.checkProductAvailability(this.newOrderForm.getRawValue()).subscribe((isAble) => {
      if (isAble) {
        this.orderService.submitNewOrder(this.newOrderForm.getRawValue()).subscribe((result: Order) => {
          console.log(result);
          this.toastrService.success("Exito", "Se creó la nueva orden con el Id: " + result.id);
          setTimeout(() => this.router.navigate(['home', 'dashboard']));
        }, error => {
          console.error(error);
          this.toastrService.danger("Error", "Hubo un error al generar nueva orden");
        });
      } else {
        this.toastrService.warning("Sin Insumos",
          "No tiene insumos suficientes para producir la orden",
          {duration: 3000});
      }
    });
  }

  private getAllMaxProductAvailability(productList: Product[]) {
    this.productService.getMaxProductAvailability(productList.map(product => product.id))
      .subscribe(result => {
        console.log(result);
        this.maxProdAvailability = result;
      });
  }
}
