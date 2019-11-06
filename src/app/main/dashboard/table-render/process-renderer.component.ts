import {Component, Input, OnInit} from "@angular/core";
import {ViewCell} from "ng2-smart-table";
import {OrderProcess} from "../model/order-process.enum";
import {OrderState} from "../model/order-state.enum";

@Component({
  template: `{{renderValue}}`
})
export class ProcessRendererComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string;
  @Input() rowData: any;

  ngOnInit(): void {
    this.renderValue = this.switchToString(this.value);
  }

  private switchToString(state: string): string {
    switch (OrderState[state]) {
      case OrderProcess.MOLIENDA: return 'Molienda';
      case OrderProcess.MACERADO: return 'Macerado';
      case OrderProcess.RECIRCULADO_LAVADO: return 'Recirculado y Lavado';
      case OrderProcess.HERVIDO: return 'Hervido';
      case OrderProcess.ENFRIADO: return 'Enfriado';
      case OrderProcess.FERMENTACION: return 'Fermentación';
      case OrderProcess.MADURADO: return 'Madurado';
      case OrderProcess.EMBOTELLADO: return 'Embotellado';
      case OrderProcess.CALIDAD: return 'Calidad';
    }
  }

}
