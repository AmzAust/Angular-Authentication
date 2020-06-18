import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'auth-app';

userActivity;
userInactive: Subject<any> = new Subject();

constructor(public _authService: AuthService) {
  this.setTimeout();
  this.userInactive.subscribe(() => {
  this._authService.logoutUser();
  });
  function logoutUser() {
    this._authService.logoutUser();
  }
}

setTimeout() {
  this.userActivity = setTimeout(() => {
    if (this._authService.loggedIn()) {
      this.userInactive.next(undefined);
      console.log('logged out');
    }
  }, 300000);
}

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }
}
