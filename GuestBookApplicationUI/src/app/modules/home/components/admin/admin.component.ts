import { Component, OnInit } from '@angular/core';
import {GuestService} from "../../../../core/services/guest.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private guestService: GuestService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('role') == null || localStorage.getItem('role') != 'ADMIN') {
      this.router.navigate(['/login']);
    }
    this.guestService.dummyApiCall().subscribe(responseDate => {});
  }

}
