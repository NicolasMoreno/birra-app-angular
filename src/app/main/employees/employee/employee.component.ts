import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-employee-component',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {

  selectedId: string;

  userForm: FormGroup;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (params) => {
      this.selectedId = params.id;
    });
    this.generateForm();
  }

  private generateForm() {
    this.userForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
      lastName: this.formBuilder.control('', [Validators.required]),
      username: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required]),
      profile: this.formBuilder.control('', [])
    });
  }
}
