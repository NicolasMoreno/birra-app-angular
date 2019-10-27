import {Component, Input, OnInit} from "@angular/core";
import {ViewCell} from "ng2-smart-table";

@Component({
  template: `{{renderDate | date: 'dd/MM/yyyy hh:mm'}}`
})
export class DateRendererComponent implements ViewCell, OnInit {

  renderDate: any;

  @Input() rowData: any;
  @Input() value: string | number;

  ngOnInit(): void {
    this.renderDate = this.value ? this.value : '';
  }

}
