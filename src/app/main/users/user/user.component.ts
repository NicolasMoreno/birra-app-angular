import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-component',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  selectedId: number | string;

  constructor(private readonly activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (params) => {
      this.selectedId = params.id;
    });
  }

}
