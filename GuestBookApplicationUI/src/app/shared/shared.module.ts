import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ConfirmationModelComponent } from './components/models/confirmation-model/confirmation-model.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MessageComponent } from './components/message/message.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [ConfirmationModelComponent, LoaderComponent, MessageComponent],
  imports: [
    RouterModule,
    BrowserModule
  ],
  exports: [
    ConfirmationModelComponent,
    LoaderComponent,
    MessageComponent
  ]
})
export class SharedModule { }
