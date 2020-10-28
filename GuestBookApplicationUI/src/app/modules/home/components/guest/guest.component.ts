import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../../core/services/data.service";
import {GuestService} from "../../../../core/services/guest.service";

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  userEmail: String;

  constructor(private dataService: DataService, private guestService: GuestService) { }

  ngOnInit(): void {
    this.guestService.dummyApiCall().subscribe(responseDate => {});
    this.dataService.modelDataObject.subscribe(modelObject => {
      this.userEmail = modelObject.data.email;
      localStorage.setItem("name", modelObject.data.username);
      localStorage.setItem("role", modelObject.data.role);
    })
  }

}
