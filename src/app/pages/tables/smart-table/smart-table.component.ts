import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent {

  settings = {
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      add: false
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

  constructor(private service: SmartTableData) {
    const data = this.service.getData();
    this.source.load(data);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
