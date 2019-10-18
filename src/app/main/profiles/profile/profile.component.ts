import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Sector} from "../../employees/model/sector";
import {LocalDataSource} from "ng2-smart-table";

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  selectedId: string;
  isNewProfile: boolean;

  settings = {
    selectMode: 'multi',
    actions: {
      add: false,
      delete: false,
      edit: false,
    },
    columns: {
      id: {
        title: 'Id',
        type: 'string',
        filter: true,
      },
      name: {
        title: 'Nombre',
        type: 'string',
        filter: true,
      }
    }
  };

  source: LocalDataSource = new LocalDataSource([{id: 1, name: 'A'}, {id: 2, name: 'B'}, {id: 3, name: 'C'}]);

  profileForm: FormGroup;
  sectors: Sector[];

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.selectedId = params.id;
      // todo get profile data
      this.generateForm();
      this.isNewProfile = this.selectedId === 'new';
    });
    this.getAllSectors();
  }

  private generateForm() {
    this.profileForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
      sectors: this.formBuilder.control('', [Validators.required])
    });
  }

  private getAllSectors() {
    // this.sectorService.getAll().subscribe( (sectors: Sector[]) => {
    //   this.sectors = sectors;
    // });
  }

  testingSelect(event) {
    // event.selected está los objetos seleccionados. todo
    console.log(event);
  }
}
