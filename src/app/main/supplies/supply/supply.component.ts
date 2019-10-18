import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-supply-component',
  templateUrl: './supply.component.html'
})
export class SupplyComponent implements OnInit {

  selectedId: string;

  supplyForm: FormGroup;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (params) => {
      this.selectedId = params.id;
      // todo get supply data

    });
    this.generateForm();
  }

  private generateForm() {
    this.supplyForm = this.fb.group( {
      supplyType: this.fb.control({value: '', disabled: true}),
      actualAmount: this.fb.control({value: '', disabled: true}),
      unit: this.fb.control({value: '', disabled: true}),
      raiseAmount: this.fb.control('', [Validators.required, Validators.min(0)])
    });
  }

  onSubmitButton() {
    console.log(this.supplyForm.getRawValue());
  }

}
