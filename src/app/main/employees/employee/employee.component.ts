import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../../shared/employee.service";
import {Employee} from "../model/employee";
import {init} from "protractor/built/launcher";
import {Profile} from "../model/profile";
import {ProfileService} from "../../../shared/profile.service";
import {EmployeeModel} from "../model/employee.model";
import {NbToastrService} from "@nebular/theme";

@Component({
  selector: 'app-employee-component',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {

  selectedId: number | string;
  isNewEmployee: boolean;
  employee: EmployeeModel;
  profiles: Profile[] = [];

  userForm: FormGroup;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly formBuilder: FormBuilder,
              private employeeService: EmployeeService,
              private profileService: ProfileService,
              private toastrService: NbToastrService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.profileService.requestProfiles().subscribe(ps => {
        console.log(ps);
        this.profiles = ps;
      });
      this.selectedId = params.id;
      this.isNewEmployee = this.selectedId === 'new';
      if (!this.isNewEmployee) {
        this.employeeService.requestEmployee(+this.selectedId).subscribe(e => {
          try {
            this.employee = EmployeeModel.from(e);
            this.generateForm();
          } catch (error) {
            console.log(error);
          }
        });
      } else {
        this.employee = EmployeeModel.empty();
        this.generateForm();
      }
    });
  }

  private generateForm() {
    this.userForm = this.formBuilder.group({
      name: this.formBuilder.control(!this.isNewEmployee ? this.employee.user.name : '', [Validators.required]),
      lastName: this.formBuilder.control(!this.isNewEmployee ? this.employee.user.lastName : '', [Validators.required]),
      username: this.formBuilder.control(!this.isNewEmployee ? this.employee.user.username : '', [Validators.required]),
      email: this.formBuilder.control(!this.isNewEmployee ? this.employee.user.mail : '', [Validators.required]),
      password: this.formBuilder.control('', []),
      profile: this.formBuilder.control(!this.isNewEmployee ? this.employee.profile.id : '', [])
    });

    if (this.isNewEmployee) {
      this.userForm.get('password').setValidators([Validators.required]);
    }
  }

  submitEmployee() {

    if (!this.isNewEmployee) {
      const data = this.userForm.getRawValue();
      this.employee.user = {
        id: this.employee.user.id,
        username: data.username,
        mail: data.email,
        name: data.name,
        lastName: data.lastName,
        password: data.password !== "" ? data.password : this.employee.user.password
      };
      this.employee.profile = this.profiles.find( profile => profile.id = data.profile);
      this.employeeService.updateEmployee(this.employee).subscribe( (updated) => {
        console.log(updated);
        this.toastrService.success("Editado empleado correctamente", "Exito", { duration: 4000 });
      }, error1 => {
        this.toastrService.danger("Error editando empleado", "error", { duration: 4000 });

      });
    } else {
      const data = this.userForm.getRawValue();
      this.employee.user = {
        id: undefined,
        username: data.username,
        mail: data.email,
        name: data.name,
        lastName: data.lastName,
        password: data.password
      };
      this.employee.profile = this.profiles.find( profile => profile.id = data.profile);
      this.employeeService.postEmployee(this.employee).subscribe( (updated) => {
        console.log(updated);
        this.toastrService.success("Creado empleado correctamente", "Exito", { duration: 4000 });
        setTimeout(() => this.router.navigate(['home', 'employees']), 4000);
      }, error1 => {
        this.toastrService.danger("Error creando empleado", "error", { duration: 4000 });
      });
    }
  }
}
