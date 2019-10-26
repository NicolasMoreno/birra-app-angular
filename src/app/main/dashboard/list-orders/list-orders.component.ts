import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {NbToastrService} from "@nebular/theme";
import {LocalDataSource} from "ng2-smart-table";
import {OrderService} from "../../../shared/order.service";
import {Order} from "../model/order";
import {OrderTableModel} from "../model/order-table.model";
import {OrderState} from "../model/order-state.enum";
import {OrderProcess} from "../model/order-process.enum";

@Component({
  selector: 'app-orders-component',
  templateUrl: './list-orders.component.html'
})
export class ListOrdersComponent implements OnInit {

  settings = {
    mode: 'external',
    edit: {
      editButtonContent: '<i class="nb-info"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
    },
    actions: {
      add: false,
      delete: 0,
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
      orderAmount: {
        title: 'Cantidad Pedido',
        type: 'number',
        filter: true,
      }
    },
  };

  source: LocalDataSource = new LocalDataSource([OrderTableModel.from({
    id: 1,
    product: {id: 10, name: 'cerveza', description: 'cerveza test'},
    state: OrderState.IN_PROGRESS,
    actualProcess: OrderProcess.GASIFICADO,
    subOrders: [],
    startedDate: new Date(),
    finishedDate: undefined,
    orderAmount: 2000,
    description: 'hola'
  })]);

  constructor(private readonly orderService: OrderService,
              private readonly router: Router,
              private readonly toastrService: NbToastrService) {}

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe( (allOrders: Order[]) => {
      console.log(allOrders);
      // this.source.load(allOrders.map( order => OrderTableModel.from(order)));
    });
  }

  onViewAction(event: {data: {id: number}}) {
    this.router.navigate(['home', 'orders', event.data.id]);
  }

}
