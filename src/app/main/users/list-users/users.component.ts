import {Component, OnInit} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {SmartTableData} from "../../../@core/data/smart-table";

@Component({
  selector: 'app-users-component',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

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
      id: {
        title: 'ID',
        type: 'number',
        filter: true,
      },
      firstName: {
        title: 'First Name',
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
      email: {
        title: 'E-mail',
        type: 'string',
        filter: true,
      },
      age: {
        title: 'Age',
        type: 'number',
        filter: true,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData) {}

  ngOnInit(): void {
    this.source.load(this.service.getData());
  }

  onEditConfirm(event) {
    console.log(event);
  }

  onDeleteConfirm(event) {
    console.log(event);
  }

}
