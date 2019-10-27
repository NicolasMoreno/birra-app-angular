import {Component, OnInit} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {Router} from "@angular/router";
import {StockService} from "../../../shared/stock.service";
import {SupplyTableModel} from "../model/supply-table.model";

@Component({
  selector: 'app-supplies-component',
  templateUrl: './supplies.component.html'
})
export class SuppliesComponent implements OnInit {

  settings = {
    mode: 'external',
    edit: {
      editButtonContent: '<i class="nb-e-commerce"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
    },
    actions: {
      add: false,
      delete: false,
      position: 'right'
    },
    columns: {
      supplyType: {
        title: 'Tipo de Insumo',
        type: 'string',
        filter: true,
      },
      amount: {
        title: 'Cantidad',
        type: 'number',
        filter: false,
      },
      unit: {
        title: 'Unidad',
        type: 'string',
        filter: true,
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private readonly router: Router, private readonly stockService: StockService) {}

  ngOnInit(): void {
    this.stockService.requestStocks().subscribe( (result) => {
      this.source.load(result.map( stock => SupplyTableModel.from(stock)));
    });
  }

  onEditAction(event: {data: {id: number}}) {
    this.router.navigate(['home', 'supplies', event.data.id]);
  }

  onDeleteAction(event) {
    // todo saltar alerta preguntando si está seguro
    this.source.remove(event.data);
  }

}
