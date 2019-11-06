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
    value: new FormControl(''),
    additionalData: new FormControl(null)
  });

  order: Order;
  currentSuborder: SubOrder;
  orderPercentage: number = 100;

  isEmittedState: boolean = false;
  isAdditionalData: boolean = false;
  isTemperatureData: boolean = false;
  isWeightData: boolean = false;
  isQuantityData: boolean = false;

  private readonly validatorsList = [Validators.required, Validators.min(1)];

  constructor(private formBuilder: FormBuilder,
              private orderService: OrderService,
              private readonly activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(param => {
      const orderID: string = param.id;
      this.orderService.getOrder(orderID).subscribe(o => {
        if (o !== undefined) {
          this.order = o;
          this.currentSuborder = this.getCurrentSubOrder();
          this.calculateProgressBar();
          this.isEmittedState = this.isSubOrderEmit();
          this.isAdditionalData = this.isAdditionalDataRequired();
          this.isTemperatureData = this.isTemperatureDataRequired();
          this.isWeightData = this.isWeightDataRequired();
          this.isQuantityData = this.isQuantityDataRequired();
          this.modifyValidators();
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
    return +OrderState[this.currentSuborder.state] === OrderState.EMITIDO;
  }

  isAdditionalDataRequired(): boolean {
    return (!this.isEmittedState &&
      this.currentSuborder.unit !== null);
  }

  getCurrentSubOrder(): SubOrder {
    return this.order.subOrders.find(s => s.orderProcess === this.order.actualProcess);
  }

  submitSubOrder(): void {
    const dataForm = this.group.getRawValue();
    this.orderService.submitOrderChange(OrderChangeModel.from(
      this.order,
      this.isSubOrderEmit() ? OrderState.EN_PROGRESO : OrderState.FINALIZADO,
      dataForm.value,
      dataForm.additionalData))
      .subscribe(resp => {
        this.order = resp;
        this.currentSuborder = this.getCurrentSubOrder();
        this.isEmittedState = this.isSubOrderEmit();
        this.calculateProgressBar();
        this.isAdditionalData = this.isAdditionalDataRequired();
        this.isTemperatureData = this.isTemperatureDataRequired();
        this.isWeightData = this.isWeightDataRequired();
        this.isQuantityData = this.isQuantityDataRequired();
        this.modifyValidators();
        this.group.get('value').setValue(undefined);
        this.group.get('additionalData').setValue(undefined);
      })
    ;
  }

  private modifyValidators() {
    const additionalDataFormControl: AbstractControl = this.group.get('additionalData');
    const dataFormControl: AbstractControl = this.group.get('value');
    if (this.isAdditionalData) {
      additionalDataFormControl.setValidators(this.validatorsList);
      if (this.isWeightData) {
        const validators = [Validators.required, Validators.min(0), Validators.max(100)];
        additionalDataFormControl.setValidators(validators);
      } else if (this.isQuantityData) {
        const validators = [Validators.required, Validators.min(0), Validators.max(this.order.orderAmount)];
        additionalDataFormControl.setValidators(validators);
      }
    } else {
      additionalDataFormControl.clearValidators();
    }

    if (this.isTemperatureData) {
      if (!this.isEmittedState) {
        dataFormControl
          .setValidators([...this.validatorsList, Validators.max(this.currentSuborder.initialData)]);
      } else {
        dataFormControl.setValidators(this.validatorsList);
      }
    } else {
      dataFormControl.clearValidators();
    }

    additionalDataFormControl.updateValueAndValidity();
    dataFormControl.updateValueAndValidity();
  }

  private isTemperatureDataRequired() {
    return this.currentSuborder.unit != null && this.currentSuborder.unit.unitName === "Celcius";
  }

  private isWeightDataRequired() {
    return this.currentSuborder.unit != null && this.currentSuborder.unit.unitName === "Kilo";
  }

  private isQuantityDataRequired() {
    return this.currentSuborder.unit != null && this.currentSuborder.unit.unitName === "Unidad";
  }
}
