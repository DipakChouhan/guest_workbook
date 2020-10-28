import { Component, OnInit } from '@angular/core';
import {GuestService} from "../../../../../core/services/guest.service";
import {DataService} from "../../../../../core/services/data.service";

@Component({
  selector: 'app-user-guest-entry-list',
  templateUrl: './user-guest-entry-list.component.html',
  styleUrls: ['./user-guest-entry-list.component.css']
})
export class UserGuestEntryListComponent implements OnInit {
  guestEntryList: [];
  public dataLoaded:boolean = false;
  constructor(private guestService: GuestService, private dataService: DataService) { }

  ngOnInit(): void {
    this.getGuestEntryList();
  }

  onGuestEntryEdit(guestBookEntry: never) {
    this.dataService.buildModelDataObject(guestBookEntry, 'edit', this, null, null);
  }

  onGuestEntryView(guestBookEntry: never) {
    this.dataService.buildModelDataObject(guestBookEntry, 'view', this, null, null);
  }

  private getGuestEntryList() {
    this.guestService.getUserGuestEntryList().subscribe(responseData => {
      this.guestEntryList = responseData["payloads"];
      this.dataLoaded = true;
      // this.dataService.buildModelDataObject(null, null, this, responseData['infoMessages'], null);
    }, error => {
      this.dataService.buildModelDataObject(null, null, this, null, error.error.errorMessages);
    });
  }
}
