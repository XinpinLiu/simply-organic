import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginPage: boolean = false;

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.title.subscribe((data) => {
      this.isLoginPage = data !== 'Sign-Up';
      console.log(this.isLoginPage);
    });

    console.log(this.isLoginPage);
  }
}
