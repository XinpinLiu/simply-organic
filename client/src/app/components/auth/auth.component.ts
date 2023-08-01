import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginPage: boolean = false;
  errorMessage: string = '';
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.title.subscribe((data) => {
      this.isLoginPage = data !== 'Sign-Up';
      console.log(this.isLoginPage);
    });

    console.log(this.isLoginPage);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.isLoginPage) {
        const { email, password } = form.value;
        this.authService.login(email, password);
        this.router.navigate(['/shop']);
      } else {
        const { username, email, password } = form.value;
        this.authService.signUp(username, email, password);
        this.router.navigate(['/shop']);
      }
    } else {
      this.errorMessage = 'Invalid Form Details';
    }
  }
}
