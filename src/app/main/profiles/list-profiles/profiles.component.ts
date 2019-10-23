import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {LocalDataSource} from "ng2-smart-table";
import {ProfileService} from "../../../shared/profile.service";
import {NbToastrService} from "@nebular/theme";

@Component({
  selector: 'app-profiles-component',
  templateUrl: './profiles.component.html'
})
export class ProfilesComponent implements OnInit {

  settings = {
    mode: 'external',
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
      add: false,
      position: 'right',
    },
    columns: {
      name: {
        title: 'Name',
        type: 'string',
        filter: true,
      },
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private readonly router: Router,
              private toastrService: NbToastrService,
              private profileService: ProfileService) {

  }

  ngOnInit(): void {
    this.profileService.requestProfiles().subscribe(ps => {
      this.source.load(ps);
    });
  }

  onEditAction(event: { data: { id: number } }) {
    this.router.navigate(['home', 'profiles', event.data.id]);
  }

  onDeleteAction(event) {
    this.profileService.deleteProfile(event.data.id).subscribe( (deleted) => {
      if (deleted) {
        this.source.remove(event.data);
        this.toastrService.success("Exito eliminando perfil", "Eliminado", {duration: 3000});
      } else {
        this.toastrService.danger("Error eliminando perfil", "No Eliminado", {duration: 3000});
      }
    });

  }

}
