import {Component, Input, OnInit} from "@angular/core";
import {ViewCell} from "ng2-smart-table";
import {OrderProcess} from "../model/order-process.enum";

@Component({
  template: `{{renderValue}}`
})
export class ProcessRendererComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: number;
  @Input() rowData: any;

  ngOnInit(): void {
    this.renderValue = OrderProcess[this.value];
  }

}
