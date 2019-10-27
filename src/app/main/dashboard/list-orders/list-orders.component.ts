import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {NbToastrService} from "@nebular/theme";
import {LocalDataSource} from "ng2-smart-table";
import {OrderService} from "../../../shared/order.service";
import {Order} from "../model/order";
import {OrderTableModel} from "../model/order-table.model";
import {OrderState} from "../model/order-state.enum";
import {OrderProcess} from "../model/order-process.enum";
import {StatusRendererComponent} from "../table-render/status-renderer.component";
import {DateRendererComponent} from "../table-render/date-renderer.component";
import {ProcessRendererComponent} from "../table-render/process-renderer.component";

@Component({
  selector: 'app-orders-component',
  templateUrl: './list-orders.component.html'
})
export class ListOrdersComponent implements OnInit {

  /*data: OrderTableModel[] =
    [
      OrderTableModel.from({
        id: 1,
        product: {id: 10, name: 'Cerveza Rubia', description: 'cerveza test'},
        state: OrderState.EN_PROGRESO,
        actualProcess: OrderProcess.HERVIDO,
        subOrders: [],
        startedDate: new Date(),
        finishedDate: undefined,
        orderAmount: 3000,
        description: 'hola'
      }),
      OrderTableModel.from({
        id: 2,
        product: {id: 11, name: 'Cerveza Rubia', description: 'cerveza test'},
        state: OrderState.FINALIZADO,
        actualProcess: OrderProcess.GASIFICADO,
        subOrders: [],
        startedDate: new Date(),
        finishedDate: undefined,
        orderAmount: 2000,
        description: 'hola'
      }),
      OrderTableModel.from({
        id: 2,
        product: {id: 11, name: 'Cerveza Rubia', description: 'cerveza test'},
        state: OrderState.FINALIZADO,
        actualProcess: OrderProcess.GASIFICADO,
        subOrders: [],
        startedDate: new Date(),
        finishedDate: undefined,
        orderAmount: 2000,
        description: 'hola'
      }),
      OrderTableModel.from({
        id: 2,
        product: {id: 11, name: 'Cerveza Rubia', description: 'cerveza test'},
        state: OrderState.FINALIZADO,
        actualProcess: OrderProcess.GASIFICADO,
        subOrders: [],
        startedDate: new Date(),
        finishedDate: undefined,
        orderAmount: 2000,
        description: 'hola'
      }),
      OrderTableModel.from({
        id: 2,
        product: {id: 11, name: 'Cerveza Rubia', description: 'cerveza test'},
        state: OrderState.FINALIZADO,
        actualProcess: OrderProcess.GASIFICADO,
        subOrders: [],
        startedDate: new Date(),
        finishedDate: undefined,
        orderAmount: 2000,
        description: 'hola'
      }),
      OrderTableModel.from({
        id: 2,
        product: {id: 11, name: 'Cerveza Rubia', description: 'cerveza test'},
        state: OrderState.FINALIZADO,
        actualProcess: OrderProcess.GASIFICADO,
        subOrders: [],
        startedDate: new Date(),
        finishedDate: undefined,
        orderAmount: 2000,
        description: 'hola'
      }),
      OrderTableModel.from({
        id: 2,
        product: {id: 11, name: 'Cerveza Rubia', description: 'cerveza test'},
        state: OrderState.FINALIZADO,
        actualProcess: OrderProcess.GASIFICADO,
        subOrders: [],
        startedDate: new Date(),
        finishedDate: undefined,
        orderAmount: 2000,
        description: 'hola'
      }),
      OrderTableModel.from({
        id: 2,
        product: {id: 11, name: 'Cerveza Rubia', description: 'cerveza test'},
        state: OrderState.FINALIZADO,
        actualProcess: OrderProcess.GASIFICADO,
        subOrders: [],
        startedDate: new Date(),
        finishedDate: undefined,
        orderAmount: 2000,
        description: 'hola'
      }),
      OrderTableModel.from({
        id: 2,
        product: {id: 11, name: 'Cerveza Rubia', description: 'cerveza test'},
        state: OrderState.FINALIZADO,
        actualProcess: OrderProcess.GASIFICADO,
        subOrders: [],
        startedDate: new Date(),
        finishedDate: undefined,
        orderAmount: 2000,
        description: 'hola'
      }),
      OrderTableModel.from({
        id: 2,
        product: {id: 11, name: 'Cerveza Rubia', description: 'cerveza test'},
        state: OrderState.FINALIZADO,
        actualProcess: OrderProcess.GASIFICADO,
        subOrders: [],
        startedDate: new Date(),
        finishedDate: undefined,
        orderAmount: 2000,
        description: 'hola'
      }),
      OrderTableModel.from({
        id: 2,
        product: {id: 11, name: 'Cerveza Rubia', description: 'cerveza test'},
        state: OrderState.FINALIZADO,
        actualProcess: OrderProcess.GASIFICADO,
        subOrders: [],
        startedDate: new Date(),
        finishedDate: undefined,
        orderAmount: 2000,
        description: 'hola'
      }),
      OrderTableModel.from({
        id: 2,
        product: {id: 11, name: 'Cerveza Rubia', description: 'cerveza test'},
        state: OrderState.FINALIZADO,
        actualProcess: OrderProcess.GASIFICADO,
        subOrders: [],
        startedDate: new Date(),
        finishedDate: undefined,
        orderAmount: 2000,
        description: 'hola'
      }),
      OrderTableModel.from({
        id: 2,
        product: {id: 11, name: 'Cerveza Rubia', description: 'cerveza test'},
        state: OrderState.FINALIZADO,
        actualProcess: OrderProcess.GASIFICADO,
        subOrders: [],
        startedDate: new Date(),
        finishedDate: undefined,
        orderAmount: 2000,
        description: 'hola'
      }),
      OrderTableModel.from({
        id: 2,
        product: {id: 11, name: 'Cerveza Rubia', description: 'cerveza test'},
        state: OrderState.FINALIZADO,
        actualProcess: OrderProcess.GASIFICADO,
        subOrders: [],
        startedDate: new Date(),
        finishedDate: undefined,
        orderAmount: 2000,
        description: 'hola'
      }),
      OrderTableModel.from({
        id: 2,
        product: {id: 11, name: 'Cerveza Rubia', description: 'cerveza test'},
        state: OrderState.FINALIZADO,
        actualProcess: OrderProcess.GASIFICADO,
        subOrders: [],
        startedDate: new Date(),
        finishedDate: undefined,
        orderAmount: 2000,
        description: 'hola'
      })
    ];*/

  data: OrderTableModel[] = [];
  source: LocalDataSource = new LocalDataSource();

  settings = {
    mode: 'external',
    edit: {
      editButtonContent: '<i class="nb-arrow-right"></i>',
    },
    noDataMessage: 'No se encontraron elementos',
    actions: {
      add: false,
      delete: false,
      position: 'right',
    },
    columns: {
      id: {
        title: 'Id Orden',
        type: 'number',
        filter: true,
      },
      product: {
        title: 'Producto',
        type: 'string',
        filter: true,
      },
      status: {
        title: 'Estado',
        type: 'custom',
        renderComponent: StatusRendererComponent,
        filter: {
          type: 'list',
          config: {
            selectText: 'Estado...',
            list: [
              { value: 'NO_COMENZADO', title: 'No Comenzado' },
              { value: 'EN_PROGRESO', title: 'En Progreso' },
              { value: 'ATRASADO', title: 'Atrasado' },
              { value: 'FINALIZADO', title: 'Finalizado' },
            ],
          },
        }
      },
      process: {
        title: 'Proceso Actual',
        type: 'custom',
        renderComponent: ProcessRendererComponent,
        filter: {
          type: 'list',
          config: {
            selectText: 'Proceso...',
            list: [
              { value: 0, title: 'Molienda' },
              { value: 1, title: 'Macerado' },
              { value: 2, title: 'Recirculado y Lavado' },
              { value: 3, title: 'Hervido' },
              { value: 4, title: 'Enfriado' },
              { value: 5, title: 'Fermentacion' },
              { value: 6, title: 'Madurado' },
              { value: 7, title: 'Embotellado' },
              { value: 8, title: 'Gasificado' },
            ],
          },
        }
      },
      startedDate: {
        title: 'Fecha Inicio',
        type: 'custom',
        renderComponent: DateRendererComponent,
        filter: true,
      },
      finishedDate: {
        title: 'Fecha Fin',
        type: 'custom',
        renderComponent: DateRendererComponent,
        filter: true,
      },
      orderAmount: {
        title: 'Cantidad Pedido',
        type: 'number',
        filter: {
          type: 'completer',
          config: {
            completer: {
              data: this.data,
              searchFields: 'orderAmount',
              titleField: 'orderAmount',
            },
          },
        },
      }
    },
  };

  finishedLoading: boolean = false;

  constructor(private readonly orderService: OrderService,
              private readonly router: Router,
              private readonly toastrService: NbToastrService) {}

  ngOnInit(): void {
    this.finishedLoading = false;
    this.orderService.getAllOrders().subscribe( (allOrders: Order[]) => {
      // console.log(allOrders);
      this.source.load(allOrders.map( order => OrderTableModel.from(order)));
      this.finishedLoading = true;
    });
  }

  onViewAction(event: {data: {id: number}}) {
    this.router.navigate(['home', 'orders', event.data.id]);
  }

}
