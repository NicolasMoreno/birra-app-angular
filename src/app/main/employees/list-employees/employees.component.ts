import {Component, OnInit} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {SmartTableData} from "../../../@core/data/smart-table";
import {Router} from "@angular/router";
import {EmployeeModel} from "../model/employee.model";
import {EmployeeService} from "../../../shared/employee.service";
import {Employee} from "../model/employee";
import {EmployeeTableModel} from "../model/employeeTable.model";
import {NbToastrService} from "@nebular/theme";

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

  employees: Employee[] = [];

  constructor(private service: SmartTableData,
              private readonly router: Router,
              private employeeService: EmployeeService,
              private toastrService: NbToastrService
  ) {
  }

  ngOnInit(): void {
    this.employeeService.requestEmployees().subscribe(es => {
      try {
        this.employees = es;
        this.source.load(this.employees.map(e => EmployeeTableModel.from(e)));
      } catch (e) {
        console.log(e);
      }
    });
  }


  onEditAction(event: { data: { id: number } }) {
    this.router.navigate(['home', 'employees', event.data.id]);
  }

  onDeleteAction(event) {
    this.employeeService.deleteEmployee(event.data.id).subscribe( (deleted) => {
      if (deleted) {
        this.source.remove(event.data);
        this.toastrService.success("Eliminado correctamente", "Eliminado", {duration: 2000});
      } else {
        this.toastrService.danger("Error eliminando", "Error", {duration: 2000});

      }
    });
  }

}
