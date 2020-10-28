import { AuthGuard } from '../../core/auth/auth.guard';
import { SignupComponent } from './components/user/signup/signup.component';
import { LoginComponent } from './components/user/login/login.component';
import { UserComponent } from './components/user/user.component';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GuestComponent } from './components/guest/guest.component';
import { AdminComponent } from './components/admin/admin.component';
import { GuestBookEntryComponent } from './components/guest/guest-book-entry/guest-book-entry.component';
import { GuestEntryListComponent } from './components/admin/guest-entry-list/guest-entry-list.component';
import { UserGuestEntryListComponent } from './components/guest/user-guest-entry-list/user-guest-entry-list.component';
import { GuestEntryFormComponent } from './components/form/guest-entry-form/guest-entry-form.component';

@NgModule({
  declarations: [ UserComponent, LoginComponent,
    SignupComponent, GuestComponent, AdminComponent,
    GuestBookEntryComponent, GuestEntryListComponent,
    UserGuestEntryListComponent,
    GuestEntryFormComponent],
  imports: [
    HomeRoutingModule,
    SharedModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  providers: [AuthGuard]
})
export class HomeModule { }
