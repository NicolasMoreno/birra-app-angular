import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Sector} from "../../employees/model/sector";
import {LocalDataSource} from "ng2-smart-table";
import {ProfileService} from "../../../shared/profile.service";
import {Profile} from "../../employees/model/profile";
import {SectorService} from "../../../shared/sector.service";

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  selectedId: number;
  isNewProfile: boolean;
  profile: Profile;

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
              private readonly formBuilder: FormBuilder,
              private profileService: ProfileService,
              private sectorService: SectorService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getAllSectors();
      this.selectedId = params.id;
      this.profileService.requestProfile(this.selectedId)
        .subscribe(p => {
          try {
            this.profile = p;

            this.isNewProfile = this.selectedId.toString() === 'new';
            this.generateForm();
          } catch (error) {
            console.log(error);
          }
        });


    });
    this.getAllSectors();
  }

  private generateForm() {
    this.profileForm = this.formBuilder.group({
      name: this.formBuilder.control(this.profile.name, [Validators.required]),
      sectors: this.formBuilder.control(this.profile.sectors, [Validators.required])
    });
  }

  private getAllSectors() {
    this.sectorService.requestSectors().subscribe(s => {
      this.sectors = s;
    });
  }

  testingSelect(event) {
    // event.selected está los objetos seleccionados. todo
    console.log(event);
  }

  onSubmitButton() {
    console.log(this.profileForm.getRawValue());
  }
}
