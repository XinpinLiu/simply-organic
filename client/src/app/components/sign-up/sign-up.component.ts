import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
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
