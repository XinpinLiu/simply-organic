import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticatedPage: boolean = false;
  isAuthenticated: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.data['title']);
    this.authService.user.subscribe((user: User | null) => {
      this.isAuthenticated = !!user;
      console.log(this.isAuthenticated);
    });
  }
}
