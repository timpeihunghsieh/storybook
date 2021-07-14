import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-temp-login',
  templateUrl: './temp-login.component.html',
  styleUrls: ['./temp-login.component.css'],
  providers: [AuthService]
})
export class TempLoginComponent implements OnInit {

  constructor(
      private router: Router,
      private ngZone: NgZone,
      private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.setIsLoggedIn();
    this.ngZone.run(() => this.router.navigateByUrl('/dashboard'));
  }

}
