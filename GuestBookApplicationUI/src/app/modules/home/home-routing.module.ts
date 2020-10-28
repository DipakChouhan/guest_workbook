import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/user/signup/signup.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import {GuestComponent} from "./components/guest/guest.component";
import {GuestBookEntryComponent} from "./components/guest/guest-book-entry/guest-book-entry.component";
import {AdminComponent} from "./components/admin/admin.component";
import {GuestEntryListComponent} from "./components/admin/guest-entry-list/guest-entry-list.component";
import {UserGuestEntryListComponent} from "./components/guest/user-guest-entry-list/user-guest-entry-list.component";

const routes: Routes = [
  {path: '', component: UserComponent, children: []},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'guest', component: GuestComponent, children: [
      {path: 'guestBookEntry', component: GuestBookEntryComponent},
      {path: 'userGuestEntryList', component: UserGuestEntryListComponent}
    ]},
  {path: 'admin', component: AdminComponent, children: [
      {path: 'guestEntryList', component: GuestEntryListComponent},
    ]},
  // {path: '**', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
