import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {NbToastrService} from "@nebular/theme";
import {LocalDataSource} from "ng2-smart-table";
import {OrderService} from "../../../shared/order.service";
import {Order} from "../model/order";

@Component({
  selector: 'app-orders-component',
  templateUrl: './list-orders.component.html'
})
export class ListOrdersComponent implements OnInit {

  settings = {
    mode: 'external',
    edit: {
      editButtonContent: '<i class="nb-e-commerce"></i>',
    },
    actions: {
      add: false,
      delete: false,
      position: 'right',
    },
    columns: {
      id: {
        title: 'Id Orden',
        type: 'number',
        filter: true
      },
      product: {
        title: 'Producto',
        type: 'string',
        filter: true,
      },
      status: {
        title: 'Estado',
        type: 'string',
        filter: true,
      },
      process: {
        title: 'Proceso Actual',
        type: 'string',
        filter: true,
      },
      startedDate: {
        title: 'Fecha Inicio',
        type: 'string',
        filter: true,
      },
      finishedDate: {
        title: 'Fecha Fin',
        type: 'string',
        filter: true,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private readonly orderService: OrderService,
              private readonly router: Router,
              private readonly toastrService: NbToastrService) {}

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe( (allOrders: Order) => {
      console.log(allOrders);
    });
  }

}
