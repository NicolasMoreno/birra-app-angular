import {Component, Input, OnInit} from "@angular/core";
import {ViewCell} from "ng2-smart-table";
import {OrderState} from "../model/order-state.enum";

@Component({
  template: `{{renderValue}}`
})
export class StatusRendererComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string;
  @Input() rowData: any;

  ngOnInit(): void {
    console.log(OrderState);
    this.renderValue = this.switchToString(this.value);
  }

  private switchToString(state: string): string {
    switch (OrderState[state]) {
      case OrderState.NO_EMPEZADO: return 'No Empezado';
      case OrderState.EN_PROGRESO: return 'En Progreso';
      case OrderState.ATRASADO: return 'Atrasado';
      case OrderState.FINALIZADO: return 'Finalizado';
    }
  }

}
