import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { clearStorage, getRefreshTokenFromStorage } from 'src/app/utils';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss'],
})
export class MainNavbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLogout() {
    const refreshToken = getRefreshTokenFromStorage();
    this.authService.logout({ refreshToken }).subscribe({
      next: (res: any) => {
        clearStorage();
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        clearStorage();
        this.router.navigate(['/login']);
      },
    });
  }
}
