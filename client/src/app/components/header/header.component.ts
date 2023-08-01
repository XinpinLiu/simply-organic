import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticatedPage: boolean = false;
  isAuthenticated: boolean = false;
  isAuthorized: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.data['title']);
    this.authService.user.subscribe((user: User | null) => {
      this.isAuthenticated = !!user;
      console.log(this.isAuthenticated);
      if (user) {
        this.isAuthorized = user.isUserAdmin();
      }
    });
  }

  onLogOut() {
    this.authService.logout();
  }
}
