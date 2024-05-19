import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FirestoreService } from '../../shared/firestore.service';
import { DocumentData } from 'firebase/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-previous',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './previous.component.html',
  styleUrl: './previous.component.css'
})
export class PreviousComponent {
  firestoreService = inject(FirestoreService);
  tournaments: DocumentData[] = [];

  ngOnInit() {
    this.getAllTournament();
  }

  async getAllTournament() {
    this.tournaments = await this.firestoreService.getTournaments("isCompleted");
  }
}
