import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {DataService} from "../../../../../core/services/data.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signUpForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.createSignupForm();
  }

  private createSignupForm() {
    // binding data with form
    this.signUpForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  public onSignUp() {
    this.userService.registerUser(this.signUpForm.value).subscribe(response => {
      this.createSignupForm();
      // this.router.navigateByUrl('/login');
      this.dataService.buildModelDataObject(null, null, this, response['infoMessages'], response['errorMessages']);
    }, error => {
      this.dataService.buildModelDataObject(null, null, this, null, error.error.errorMessages);
    });
  }

}
