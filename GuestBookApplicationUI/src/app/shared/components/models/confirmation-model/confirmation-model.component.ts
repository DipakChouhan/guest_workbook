import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from 'src/app/core/services/todo.service';
import { DataService } from 'src/app/core/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import {AdminService} from "../../../../core/services/admin.service";

@Component({
  selector: 'app-confirmation-model',
  templateUrl: './confirmation-model.component.html',
  styleUrls: ['./confirmation-model.component.css']
})
export class ConfirmationModelComponent implements OnInit {

  public guestEntry: any;
  public mode: String;

  constructor(private adminService: AdminService, private dataService: DataService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataService.modelDataObject.subscribe(modelObject => {
      this.guestEntry = modelObject.data;
      this.mode = modelObject.mode;
    });
  }

  onYes() {
    // this.todoService.deleteTodoById(this.todo.id).subscribe(responseData => {
    //   this.dataService.context.getTodoList();
    // });
    if (this.mode == 'delete') {
      this.adminService.deleteGuestEntry(this.guestEntry.guestBookEntryId).subscribe(responseData => {
        this.dataService.context.getGuestEntryList();
        this.dataService.buildModelDataObject(null, null, this.dataService.context, responseData['infoMessages'], null);
      }, error => {
        this.dataService.buildModelDataObject(null, null, this.dataService.context, null, error.error.errorMessages);
      });
    } else if (this.mode == 'approve') {
      this.adminService.approveGuestEntry(this.guestEntry.guestBookEntryId).subscribe(responseData => {
        this.dataService.context.getGuestEntryList();
        this.dataService.buildModelDataObject(null, null, this.dataService.context, responseData['infoMessages'], null);
      }, error => {
        this.dataService.buildModelDataObject(null, null, this.dataService.context, null, error.error.errorMessages);
      });
    }

  }
}
