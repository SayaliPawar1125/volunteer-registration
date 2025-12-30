import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
 
  events: any[] = [];

  constructor(private auth: AuthService) {
    this.auth.getCoordinatorEvents().subscribe(res => this.events = res);
  }
}
