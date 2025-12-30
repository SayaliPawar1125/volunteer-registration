import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-event-mapping',
  imports: [CommonModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './event-mapping.component.html',
  styleUrl: './event-mapping.component.css'
})
export class EventMappingComponent {
  events: any[] = [];
  volunteers: any[] = [];
  selectedVolunteers: number[] = [];
  selectedEventId!: number;

  constructor(private auth: AuthService) {
    this.auth.getCoordinatorEvents().subscribe(res => this.events = res);
  }

  selectEvent(eventId: number) {
    this.selectedEventId = eventId;
    this.auth.getVolunteersForEvent(eventId)
      .subscribe(res => this.volunteers = res);
  }

  toggleVolunteer(id: number) {
    const index = this.selectedVolunteers.indexOf(id);

    if (index === -1) {
      this.selectedVolunteers.push(id);
    } else {
      this.selectedVolunteers.splice(index, 1);
    }
  }

  assign() {
    this.auth.assignVolunteers({
      event_id: this.selectedEventId,
      volunteers: this.selectedVolunteers
    }).subscribe(() => alert('Email sent & volunteers assigned'));
  }

}
