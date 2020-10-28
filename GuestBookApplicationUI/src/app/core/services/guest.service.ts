import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  constructor(private httpClient: HttpClient ) {
  }

  createGuestBookEntryOnlyText(guestBookEntryModel: any) {
    return this.httpClient.post("http://localhost:8080/guest/createGuestBookEntry", guestBookEntryModel);
  }

  createGuestBookEntryImage(uploadImageData: FormData) {
    return this.httpClient.post("http://localhost:8080/guest/createGuestBookEntryImage", uploadImageData);
  }

  getUserGuestEntryList() {
    return this.httpClient.get("http://localhost:8080/guest/getAllGuestBookEntriesForUser/" + localStorage.getItem('userId'));
  }

  dummyApiCall() {
    return this.httpClient.get("dummyUrl");
  }

  updateGuestEntryText(guestBookEntryModel: any) {
    return this.httpClient.post("http://localhost:8080/guest/updateGuestEntryText", guestBookEntryModel);
  }
}
