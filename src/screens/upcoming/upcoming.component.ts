import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DocumentData } from 'firebase/firestore';
import { FirestoreService } from '../../shared/firestore.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upcoming',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.css',
})
export class UpcomingComponent {
  firestoreService = inject(FirestoreService);
  tournaments: DocumentData[] = [];

  ngOnInit() {
    this.getAllTournament();
  }

  async getAllTournament() {
    this.tournaments = await this.firestoreService.getTournaments('isLive');
  }
}
