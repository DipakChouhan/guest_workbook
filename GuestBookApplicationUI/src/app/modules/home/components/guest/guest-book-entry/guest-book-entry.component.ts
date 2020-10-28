import { GuestService } from 'src/app/core/services/guest.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DataService} from "../../../../../core/services/data.service";

@Component({
  selector: 'app-guest-book-entry',
  templateUrl: './guest-book-entry.component.html',
  styleUrls: ['./guest-book-entry.component.css']
})
export class GuestBookEntryComponent implements OnInit {
  guestEntryForm: FormGroup;
  selectImage: boolean = false;
  guestEntryImageForm: FormGroup;
  selectedFile: File= null;

  constructor(private guestService: GuestService, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.guestService.dummyApiCall().subscribe(responseDate => {});
    this.createGuestEntryForm();
    this.createGuestEntryImageForm();
  }

  private createGuestEntryForm() {
    // binding data with form
    this.guestEntryForm = new FormGroup({
      // name: new FormControl(null, Validators.required),
      guestBookEntryText: new FormControl(null, Validators.required),
      // address: new FormControl(null, Validators.required),
      // gender: new FormControl(null, Validators.required),
      // identityId: new FormControl(null, Validators.required),
      // file: new FormControl(null, Validators.required),
      // phoneNo: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
    });
  }

  private createGuestEntryImageForm() {
    this.guestEntryImageForm = new FormGroup({
      file: new FormControl(null, Validators.required),
    });
  }

  onGuestEntryFormSubmit() {
    console.log(this.guestEntryForm.value);
    this.guestService.createGuestBookEntryOnlyText(this.guestEntryForm.value).subscribe(responseData => {
      this.createGuestEntryForm();
      this.dataService.buildModelDataObject(null, null, this, responseData['infoMessages'], null);
    }, error => {
      this.dataService.buildModelDataObject(null, null, this, null, error.error.errorMessages);
    });
  }

  onOptionChange($event: Event) {
    this.selectImage = $event.target['checked'] == true;
    this.dataService.buildModelDataObject(null, null, this, null, null);
  }

  onFileChanged($event: Event) {
    console.log($event.target['files'][0])
    this.selectedFile = $event.target['files'][0];
  }

  onGuestEntryImageFormSubmit() {
    const uploadImageData = new FormData();
    uploadImageData.append('file', this.selectedFile, this.selectedFile.name);
    this.guestService.createGuestBookEntryImage(uploadImageData).subscribe(responseData => {
      console.log(responseData);
      this.createGuestEntryImageForm();
      this.dataService.buildModelDataObject(null, null, this, responseData['infoMessages'], null);
    }, error => {
      this.dataService.buildModelDataObject(null, null, this, null, error.error.errorMessages);
    });
  }

  clearImageSelection() {
    this.selectedFile = null;
  }
}
