import {Component, OnInit} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {SmartTableData} from "../../../@core/data/smart-table";
import {Router} from "@angular/router";
import {EmployeeModel} from "../model/employee.model";

@Component({
  selector: 'app-employees-component',
  templateUrl: './employees.component.html'
})
export class EmployeesComponent implements OnInit {

  settings = {
    mode: 'external',
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      add: false,
      position: 'right',
    },
    columns: {
      firstName: {
        title: 'Name',
        type: 'string',
        filter: true,
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
        filter: true,
      },
      username: {
        title: 'Username',
        type: 'string',
        filter: true,
      },
      profile: {
        title: 'Profile',
        type: 'string',
        filter: true,
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData, private readonly router: Router) {}

  ngOnInit(): void {
    this.source.load(this.service.getData());
    // this.source.load(this.service.getData().map( data => EmployeeModel.from(data).toEmployeeTable()));
  }

  onEditAction(event: {data: {id: number}}) {
    this.router.navigate(['home', 'employees', event.data.id]);
  }

  onDeleteAction(event) {
    this.source.remove(event.data);
  }

}
