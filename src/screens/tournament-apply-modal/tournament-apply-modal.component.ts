import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirestoreService } from '../../shared/firestore.service';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { Timestamp } from 'firebase/firestore';
import { Player, TournTeam } from '../../models/tourn-team';

@Component({
  selector: 'app-tournament-apply-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tournament-apply-modal.component.html',
  styleUrl: './tournament-apply-modal.component.css'
})
export class TournamentApplyModalComponent {
  firestoreService = inject(FirestoreService);
  sharedService = inject(SharedService);
  router = inject(Router)
  

  openModal() {
    this.sharedService.isTournApplyVisible = true;
  }

  closeModal() {
    this.sharedService.isTournApplyVisible = false;
  }
  
  onSubmit() {
    console.log(this.sharedService.captainForm.value);
    this.sharedService.tournFormId = "";
    if (this.sharedService.captainForm.valid) {
      console.log('Form Submitted');
      this.isExistingCaptain();
    } else {
      this.sharedService.captainForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }
  
  async isExistingCaptain() {
    const querySnapshot = await this.firestoreService.getTournTeamWithMobile(this.sharedService.tournamentId, this.sharedService.captainForm.value.mobile!);
    if (querySnapshot.empty) {
      console.log("new captain!");
      const docId = await this.createCaptain();
      this.sharedService.tournFormId = docId;
    } else {
      console.log("existing captain!");
      this.sharedService.tournFormId = querySnapshot.docs.at(0)!.id;
    }
    this.sharedService.isTournApplyVisible = false;
    this.router.navigateByUrl("/tourn-form");
  }

  
  async createCaptain() {
    const players: Player[] = [];
    // const players: Player[] = [
    //   { name: 'Player1', mobile: '1234567890' },
    //   { name: 'Player2', mobile: '0987654321' },
    // ];

    const newTeam = new TournTeam(
      '',
      this.sharedService.tournamentId,
      Timestamp.fromDate(new Date()),
      '',
      this.sharedService.captainForm.value.name!,
      this.sharedService.captainForm.value.mobile!,
      '',
      '',
      '',
      '',
      '',
      players,
    );

    const docId = await this.firestoreService.createTournTeam(newTeam);
    console.log("successfully created");
    return docId;
  }
}
