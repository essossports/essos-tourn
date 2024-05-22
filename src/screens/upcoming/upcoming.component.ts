import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DocumentData, QuerySnapshot, Timestamp } from 'firebase/firestore';
import { FirestoreService } from '../../shared/firestore.service';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../shared/shared.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Player, TournTeam } from '../../models/tourn-team';
import { TournamentApplyModalComponent } from '../tournament-apply-modal/tournament-apply-modal.component';

@Component({
  selector: 'app-upcoming',
  standalone: true,
  imports: [RouterLink, CommonModule, TournamentApplyModalComponent],
  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.css',
})
export class UpcomingComponent {
  firestoreService = inject(FirestoreService);
  sharedService = inject(SharedService);
  router = inject(Router)
  tournaments: DocumentData[] = [];

  ngOnInit() {
    this.getAllTournament();
  }

  async getAllTournament() {
    this.tournaments = await this.firestoreService.getTournaments('isLive');
  }

  createTeam(id:string) {
    this.sharedService.tournamentId = id;
    // this.router.navigateByUrl("tourn-form");
    this.sharedService.captainForm.reset();
    this.sharedService.isTournApplyVisible = true;
  }
}
