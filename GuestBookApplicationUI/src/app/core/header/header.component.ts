import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: String;
  isLoggedIn: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const user = localStorage.getItem("name");
    if (user == null) {
      this.username = 'Guest'
    } else {
      this.username = user;
    }
  }


  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
