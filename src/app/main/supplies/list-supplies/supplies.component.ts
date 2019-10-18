import {Component, OnInit} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {Router} from "@angular/router";

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
      delete: 0,
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

  source: LocalDataSource = new LocalDataSource(
    [
      {id: 1, supplyType: 'Agua', amount: 10, unit: 'Litros'},
      {id: 2, supplyType: 'Granos', amount: 10, unit: 'Kilos'},
      {id: 3, supplyType: 'Malta', amount: 5, unit: 'Kilos'},
      {id: 4, supplyType: 'Lúpulo', amount: 20, unit: 'Kilos'},
    ]
  );

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
  }

  onEditAction(event: {data: {id: number}}) {
    this.router.navigate(['home', 'supplies', event.data.id]);
  }

  onDeleteAction(event) {
    // todo saltar alerta preguntando si está seguro
    this.source.remove(event.data);
  }

}
