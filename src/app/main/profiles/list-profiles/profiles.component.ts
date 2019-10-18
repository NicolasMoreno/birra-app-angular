import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {LocalDataSource} from "ng2-smart-table";

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

  constructor(private readonly router: Router) {
  }

  ngOnInit(): void {
    // this.source.load(this.profileService.getProfiles())
  }

  onEditAction(event: {data: {id: number}}) {
    this.router.navigate(['home', 'profiles', event.data.id]);
  }

  onDeleteAction(event) {
    this.source.remove(event.data);
  }

}