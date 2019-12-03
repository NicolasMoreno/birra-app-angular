import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {StockService} from "../../../shared/stock.service";
import {Stock} from "../model/stock";
import {NbToastrService} from "@nebular/theme";

@Component({
  selector: 'app-supply-component',
  templateUrl: './supply.component.html'
})
export class SupplyComponent implements OnInit {

  selectedId: string;
  stock: Stock;

  supplyForm: FormGroup;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly fb: FormBuilder,
              private toastrService: NbToastrService,
              private router: Router,
              private readonly stockService: StockService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (params) => {
      this.selectedId = params.id;
      this.stockService.requestStock(+this.selectedId).subscribe( (stock: Stock) => {
        console.log(stock);
        this.stock = stock;
        this.generateForm();
      });
    });
  }

  private generateForm() {
    this.supplyForm = this.fb.group( {
      supplyType: this.fb.control({value: this.stock.material.name, disabled: true}),
      actualAmount: this.fb.control({value: this.stock.storedQuantity, disabled: true}),
      unit: this.fb.control({value: this.stock.material.unit.unitName, disabled: true}),
      raiseAmount: this.fb.control(0, [Validators.required, Validators.min(0.01)])
    });
  }

  onSubmitButton() {
    const data = this.supplyForm.getRawValue();
    console.log(data);
    const restockingValues = {materialId: this.stock.material.id, restockingAmount: data.raiseAmount};
    this.stockService.addStock(restockingValues).subscribe( (result) => {
      console.log(result);
      this.toastrService.success("Se stockeó satisfactoriamente el material", "Exito", {duration: 2000});
      setTimeout( () => this.router.navigate(['home', 'supplies']), 2000);
    });
  }

}
