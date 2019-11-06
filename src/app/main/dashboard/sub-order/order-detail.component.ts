import {Component} from "@angular/core";
import {Order} from "../model/order";
import {OrderState} from "../model/order-state.enum";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../../../shared/order.service";
import {SubOrder} from "../model/sub-order";
import {ActivatedRoute} from "@angular/router";
import {OrderChangeModel} from "../model/order-change.model";

@Component({
  selector: 'app-order-detail.component',
  templateUrl: './order-detail.component.html'
})
export class OrderDetailComponent {
  group: FormGroup = this.formBuilder.group({
    value: new FormControl('',
      [Validators.required,
        Validators.min(1)]),
    additionalData: new FormControl(null)
  });

  order: Order;
  orderPercentage: number = 100;

  isEmittedState: boolean = false;
  isAdditionalData: boolean = false;

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
          this.isEmittedState = this.isSubOrderEmit();
          this.isAdditionalData = this.isAdditionalDataRequired();
          this.modifyValidators(this.isAdditionalData);
        }
      });
    });
  }

  calculateProgressBar(): void {
    const all: number = this.order.subOrders.length;
    const countFinished: number = this.order.subOrders
      .filter(s => +OrderState[s.state] === OrderState.FINALIZADO).length;
    if (countFinished > 0) {
      const arimetic: number = countFinished / all * 100;
      this.orderPercentage = Math.trunc(arimetic);
    } else {
      this.orderPercentage = 1;
    }
  }

  isOrderFinished(): boolean {
    return +OrderState[this.order.state] === OrderState.FINALIZADO;
  }

  isSubOrderEmit(): boolean {
    const currentSubOrder: SubOrder = this.order.subOrders.find(s => s.orderProcess === this.order.actualProcess);
    return +OrderState[currentSubOrder.state] === OrderState.EMITIDO;
  }

  isAdditionalDataRequired(): boolean {
    const currentSubOrder: SubOrder = this.order.subOrders.find(s => s.orderProcess === this.order.actualProcess);
    return !this.isEmittedState &&
      currentSubOrder.unit !== null;
  }

  submitSubOrder(): void {
    const dataForm = this.group.getRawValue();
    this.orderService.submitOrderChange(OrderChangeModel.from(
      this.order,
      dataForm.value,
      this.isSubOrderEmit() ? OrderState.EN_PROGRESO : OrderState.FINALIZADO))
      .subscribe(resp => {
        this.order = resp;
        this.isEmittedState = this.isSubOrderEmit();
        this.calculateProgressBar();
        this.isAdditionalData = this.isAdditionalDataRequired();
        this.modifyValidators(this.isAdditionalData);
        this.group.get('value').setValue(undefined);
        this.group.get('additionalData').setValue(undefined);
      })
    ;
  }

  private modifyValidators(isAdditionalData: boolean) {
    const additionalDataFormControl: AbstractControl = this.group.get('additionalData');
    if (isAdditionalData) {
      additionalDataFormControl.setValidators([Validators.required, Validators.min(1)]);
    } else {
      additionalDataFormControl.clearValidators();
    }
    additionalDataFormControl.updateValueAndValidity();
  }
}
