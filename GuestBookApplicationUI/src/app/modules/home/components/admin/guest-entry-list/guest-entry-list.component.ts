import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../../../../core/services/admin.service";
import {DataService} from "../../../../../core/services/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-guest-entry-list',
  templateUrl: './guest-entry-list.component.html',
  styleUrls: ['./guest-entry-list.component.css']
})
export class GuestEntryListComponent implements OnInit {

  guestEntryList: [];
  public dataLoaded:boolean = false;

  constructor(private adminService: AdminService, private  dataService: DataService,
              private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('role') == null || localStorage.getItem('role') != 'ADMIN') {
      this.router.navigate(['/login']);
    }
    this.getGuestEntryList();
  }
  getGuestEntryList() {
    this.adminService.getGuestEntryList().subscribe(responseData => {
      this.guestEntryList = responseData["payloads"]
      this.dataLoaded = true;
    });
  }

  onGuestEntryApprove(guestBookEntry: any) {
    // this.adminService.approveGuestEntry(guestBookEntryId).subscribe(responseData => {
    //   console.log(responseData);
    //   this.dataService.buildModelDataObject(null, null, this, ['infoMessages'], responseData['infoMessages']);
    // }, error => {
    //   this.dataService.buildModelDataObject(null, null, this, null, error.error.errorMessages);
    // });
    this.dataService.buildModelDataObject(guestBookEntry, 'approve', this, null, null);
  }

  onGuestEntryDelete(guestBookEntry: never) {
    // this.adminService.deleteGuestEntry(guestBookEntryId).subscribe(responseData => {
    //   console.log(responseData);
    //   this.dataService.buildModelDataObject(null, null, this, ['infoMessages'], responseData['infoMessages']);
    // }, error => {
    //   this.dataService.buildModelDataObject(null, null, this, null, error.error.errorMessages);
    // });

    this.dataService.buildModelDataObject(guestBookEntry, 'delete', this, null, null);

    // this.getGuestEntryList();
    // this.dataService.buildModelDataObject(null, null, this, responseData['infoMessages'],responseData['infoMessages']);
  }

  onGuestEntryView(guestBookEntry: never) {
    this.dataService.buildModelDataObject(guestBookEntry, 'view', this, null, null);
  }
}
