import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {
    email: '',
    password: ''
  };
  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit(): void {
  }

  registerUser() {
    this._auth.registerUser(this.registerUserData)
      .subscribe(
        res => {
          console.log(res);
          // console.log(this.registerUserData.email);
          // console.log(this.registerUserData.password);
          localStorage.setItem('token', res.token);
          this._router.navigate(['/paid']);
        },
        err => console.log(err)
      );
  }

}
