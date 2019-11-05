import {Component} from "@angular/core";
import {Order} from "../model/order";
import {OrderState} from "../model/order-state.enum";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../../../shared/order.service";
import {SubOrder} from "../model/sub-order";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-order-detail.component',
  templateUrl: './order-detail.component.html'
})
export class OrderDetailComponent {
  group: FormGroup = this.formBuilder.group({
    value: new FormControl('',
      [Validators.required,
        Validators.min(1)])
  });

  order: Order;
  orderPercentage: number = 100;

  constructor(private formBuilder: FormBuilder,
              private orderService: OrderService,
              private readonly activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(param => {
      const orderID: string = param.id;
      this.orderService.getOrder(orderID).subscribe(o => {
        if (o !== undefined) {
          this.order = o;
          this.calculateProgressBar();
        }
      });
    });
  }

  calculateProgressBar(): void {
    const all: number = this.order.subOrders.length;
    const countFinished: number = this.order.subOrders.filter(s => s.state === OrderState.FINALIZADO).length;
    if (countFinished === 0) {
      this.orderPercentage = (countFinished / this.order.subOrders.length) * 100;
    } else {
      this.orderPercentage = 1;
    }

  }

  isOrderFinished(): boolean {
    return this.order.state === OrderState.FINALIZADO;
  }

  isSubOrderEmit(): boolean {
    const currentSubOrder: SubOrder = this.order.subOrders.find(s => s.process === this.order.actualProcess);
    return currentSubOrder.state === OrderState.EMITIDO;
  }

  submitSubOrder(): void {
  }
}
