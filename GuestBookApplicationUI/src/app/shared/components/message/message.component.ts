import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  public errorMessages: [];
  public infoMessages: [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.modelDataObject.subscribe(modelObject => {
      this.errorMessages = modelObject.errorMessages;
      this.infoMessages = modelObject.infoMessages;
    });
  }

}
