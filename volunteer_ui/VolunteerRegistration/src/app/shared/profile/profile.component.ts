import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {

  user: any;

  constructor(private auth: AuthService, private router: Router) {
    this.auth.getProfile().subscribe(res => this.user = res);
  }

  goChangePassword() {
    this.router.navigate(['/change-password']);
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
