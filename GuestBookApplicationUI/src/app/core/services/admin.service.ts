import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient ) {
  }

  getGuestEntryList() {
    return this.httpClient.get("http://localhost:8080/admin/getAllGuestBookEntries");
  }

  approveGuestEntry(guestBookEntryId: any) {
    return this.httpClient.put("http://localhost:8080/admin/approveGuestBookEntries", guestBookEntryId);
  }

  deleteGuestEntry(guestBookEntryId: any) {
    return this.httpClient.post("http://localhost:8080/admin/deleteGuestBookEntries", guestBookEntryId);
  }
}
