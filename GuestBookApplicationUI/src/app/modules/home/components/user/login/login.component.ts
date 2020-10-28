import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public signInForm: FormGroup;

  constructor(private userService: UserService, private router: Router,
    private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    localStorage.clear();
    this.createSignInForm();
  }

  private createSignInForm() {
    // binding data with form
    this.signInForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  public onSignIn() {
    console.log(this.signInForm.value);
    this.userService.signInUser(this.signInForm.value).subscribe(response => {
      console.log(response);
      localStorage.setItem("user_token", response['payloads']);
      // this.router.navigate(['/home']);
      // this.router.navigate(['/admin']);
      console.log('Sign In Form' , this.signInForm.value['email'])
      this.userService.getUserDetails(this.signInForm.value['email']).subscribe(responseData => {
        console.log('id:' + responseData['payloads'].id);
          localStorage.setItem("name", responseData['payloads'].username);
          localStorage.setItem("role", responseData['payloads'].role);
          localStorage.setItem("userId", responseData['payloads'].id);
          console.log(responseData);
          if (responseData['payloads'].role == 'USER') {
            this.router.navigate(['/guest']);
          }
          if (responseData['payloads'].role == 'ADMIN') {
            this.router.navigate(['/admin']);
          }
        // this.dataService.buildModelDataObject(null, null, this, null, error.error.errorMessages);
        }
      );
    }, error => {
      this.dataService.buildModelDataObject(null, null, this, null, error.error.errorMessages);
    });
  }

}
