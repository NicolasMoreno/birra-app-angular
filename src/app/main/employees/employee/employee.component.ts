import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../../shared/employee.service";
import {Employee} from "../model/employee";
import {init} from "protractor/built/launcher";
import {Profile} from "../model/profile";
import {ProfileService} from "../../../shared/profile.service";

@Component({
  selector: 'app-employee-component',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {

  selectedId: number | string;
  isNewEmployee: boolean;
  employee: Employee;
  profiles: Profile[] = [];

  userForm: FormGroup;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly formBuilder: FormBuilder,
              private employeeService: EmployeeService,
              private profileService: ProfileService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.profileService.requestProfiles().subscribe(ps => {
        this.profiles = ps;
      });
      this.selectedId = params.id;
      this.employeeService.requestEmployee(+this.selectedId).subscribe(e => {
        try {
          this.employee = e;
          this.generateForm();
        } catch (error) {
          console.log(error);
        }
      });
      this.isNewEmployee = this.selectedId === 'new';
    });
  }

  private generateForm() {
    this.userForm = this.formBuilder.group({
      name: this.formBuilder.control(this.employee.user.name, [Validators.required]),
      lastName: this.formBuilder.control(this.employee.user.lastName, [Validators.required]),
      username: this.formBuilder.control(this.employee.user.username, [Validators.required]),
      email: this.formBuilder.control(this.employee.user.mail, [Validators.required]),
      password: this.formBuilder.control(this.employee.user.password, [Validators.required]),
      profile: this.formBuilder.control(this.employee.profile.id, [])
    });
  }

  submitEmployee() {
    if (this.isNewEmployee) this.employeeService.postEmployee(this.employee);
    else this.employeeService.updateEmployee(this.employee);
  }
}
