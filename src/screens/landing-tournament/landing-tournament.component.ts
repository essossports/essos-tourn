import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../../shared/firestore.service';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../shared/shared.service';
import { HomeComponent } from '../home/home.component';
import { Tournament } from '../../models/tournament';
import { TournamentApplyModalComponent } from '../tournament-apply-modal/tournament-apply-modal.component';

@Component({
  selector: 'app-landing-tournament',
  standalone: true,
  imports: [CommonModule, HomeComponent, TournamentApplyModalComponent],
  templateUrl: './landing-tournament.component.html',
  styleUrl: './landing-tournament.component.css',
})
export class LandingTournamentComponent implements OnInit {
  router = inject(Router);
  firestoreService = inject(FirestoreService);
  sharedService = inject(SharedService);
  isLoading = true;
  tournament!:Tournament;
  isVisible = false;

  ngOnInit() {
    if (this.sharedService.landing == null) {
      this.landingOrHome();
    } else {
      this.isLoading = false;
    }
  }

  async landingOrHome() {
    this.isLoading = true;
    const startTime = Date.now();
    const tournamentQuery = await this.firestoreService.getLandingTournament();
    if (tournamentQuery.empty) {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 1000 - elapsedTime);
      setTimeout(() => {
        this.sharedService.landing = false;
        console.log('showing home page', remainingTime);
        this.isLoading = false;
      }, remainingTime);
    } else {
      console.log('showing landing page');
      this.sharedService.landing = true;
      this.isLoading = false;
      this.tournament = tournamentQuery.docs.at(0)!.data();
    }
  }

  closeLanding() {
      this.sharedService.landing = false;
  }

  applyNow() {
    this.isVisible = true;
    this.sharedService.tournamentId = this.tournament.id;
    this.sharedService.captainForm.reset();
    this.sharedService.isTournApplyVisible = true;
  }


}
