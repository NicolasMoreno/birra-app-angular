import {Component, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Sector} from "../../employees/model/sector";
import {LocalDataSource} from "ng2-smart-table";
import {ProfileService} from "../../../shared/profile.service";
import {Profile} from "../../employees/model/profile";
import {SectorService} from "../../../shared/sector.service";
import {Ng2SmartTableComponent} from "ng2-smart-table/ng2-smart-table.component";
import {NbToastrService} from "@nebular/theme";

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


  source: LocalDataSource = new LocalDataSource();

  profileForm: FormGroup;
  sectors: Sector[];

  selectedSectors: Sector[] = [];

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly formBuilder: FormBuilder,
              private profileService: ProfileService,
              private sectorService: SectorService,
              private toastrService: NbToastrService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getAllSectors();
      this.selectedId = params.id;
      this.isNewProfile = this.selectedId.toString() === 'new';
      if (!this.isNewProfile) {
        this.profileService.requestProfile(this.selectedId)
          .subscribe(p => {
            try {
              this.profile = p;
              this.selectedSectors = this.profile.sectors;
              this.getAllSectors();
              this.generateForm();
            } catch (error) {
              console.log(error);
            }
          });
      } else {
        this.profile = new class implements Profile {
          id: number = undefined;
          name: string = '';
          sectors: Sector[] = [];
        };
        this.generateForm();
        this.getAllSectors();
      }

    });
  }

  private generateForm() {
    this.profileForm = this.formBuilder.group({
      name: this.formBuilder.control(!this.isNewProfile ? this.profile.name : '', [Validators.required]),
      sectors: this.formBuilder.control(!this.isNewProfile ? this.profile.sectors : [], [])
    });
  }

  private getAllSectors() {
    this.sectorService.requestSectors().subscribe(s => {
      this.sectors = s;
      this.source.load(this.sectors);
    });
  }

  testingSelect(event) {
    // event.selected está los objetos seleccionados. todo
    console.log(event);
    this.selectedSectors = event.selected;
  }

  onSubmitButton() {
    const data = this.profileForm.getRawValue();
    console.log(data);
    if (this.isNewProfile) {
      data.sectors = this.selectedSectors;
      this.profileService.postProfile(data).subscribe((resp) => {
        console.log(resp);
        this.toastrService.success("Exito creando perfil", "Guardado", {duration: 3000});
        setTimeout(() => this.router.navigate(['home', 'profiles']), 3000);
      }, error => {
        this.toastrService.danger("Error creando perfil", "Error", {duration: 3000});
      });
    } else {
      data.id = this.profile.id;
      data.sectors = this.selectedSectors;
      this.profileService.updateProfile(data).subscribe((resp) => {
        this.toastrService.success("Exito editando perfil", "Guardado", {duration: 3000});
        setTimeout(() => this.router.navigate(['home', 'profiles']), 3000);
      }, error1 => {
        this.toastrService.danger("Error creando perfil", "Error", {duration: 3000});
      });
    }
  }

  getPreviousSectors(): string {
    return this.profile.sectors.map(sector => sector.name).toString();
  }
}
