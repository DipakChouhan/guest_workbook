import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GuestService} from "../../../../../core/services/guest.service";
import {DataService} from "../../../../../core/services/data.service";

@Component({
  selector: 'app-guest-entry-form',
  templateUrl: './guest-entry-form.component.html',
  styleUrls: ['./guest-entry-form.component.css']
})
export class GuestEntryFormComponent implements OnInit {
  mode: String;
  guestEntryForm: FormGroup;
  guestEntryImageForm: FormGroup;
  guestEntry: any = {};
  guestEntryLocal: any = {};
  constructor(private  guestService: GuestService, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.modelDataObject.subscribe(modelObject => {
      this.createGuestEntryForm(modelObject.data);
      this.mode = modelObject.mode;
      this.guestEntryLocal = modelObject.data;
    });
    this.createGuestEntryForm(this.guestEntry);
  }

  private createGuestEntryForm(data:any) {
    // binding data with form
    this.guestEntryForm = new FormGroup({
      guestBookEntryText: new FormControl(data.guestBookEntryText, Validators.required),
      guestBookEntryId: new FormControl(data.guestBookEntryId, Validators.required),
    });
  }

  onGuestEntryUpdate() {
    if (this.mode == 'edit') {
      this.guestService.updateGuestEntryText(this.guestEntryForm.value).subscribe(response => {
        // Refreshing the list, calling method from the context
        this.dataService.context.getGuestEntryList();
        this.dataService.buildModelDataObject(null, null, this, response['infoMessages'], null);
      }, error => {
        this.dataService.buildModelDataObject(null, null, this, null, error.error.errorMessages);
      });
   }
  }
}
