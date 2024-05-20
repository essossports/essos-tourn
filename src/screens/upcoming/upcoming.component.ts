import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DocumentData, QuerySnapshot, Timestamp } from 'firebase/firestore';
import { FirestoreService } from '../../shared/firestore.service';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../shared/shared.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Player, TournTeam } from '../../models/tourn-team';

@Component({
  selector: 'app-upcoming',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.css',
})
export class UpcomingComponent {
  firestoreService = inject(FirestoreService);
  sharedService = inject(SharedService);
  router = inject(Router)
  tournaments: DocumentData[] = [];
  isVisible = false;
  captainForm = new FormGroup({
    name: new FormControl('', Validators.required),
    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern('^\\d{10}$'),
    ]),
  });

  ngOnInit() {
    this.getAllTournament();
  }

  async getAllTournament() {
    this.tournaments = await this.firestoreService.getTournaments('isLive');
  }

  createTeam(id:string) {
    this.sharedService.tournamentId = id;
    // this.router.navigateByUrl("tourn-form");
    this.captainForm.reset();
    this.openModal();
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
      this.captainForm.value.name!,
      this.captainForm.value.mobile!,
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

  async isExistingCaptain() {
    const querySnapshot = await this.firestoreService.getTournTeamWithMobile(this.sharedService.tournamentId, this.captainForm.value.mobile!);
    if (querySnapshot.empty) {
      console.log("new captain!");
      const docId = await this.createCaptain();
      this.sharedService.tournFormId = docId;
    } else {
      console.log("existing captain!");
      this.sharedService.tournFormId = querySnapshot.docs.at(0)!.id;
    }
    this.router.navigateByUrl("/tourn-form");
  }


  openModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
  }
  
  onSubmit() {
    console.log(this.captainForm.value);
    this.sharedService.tournFormId = "";
    if (this.captainForm.valid) {
      console.log('Form Submitted');
      this.isExistingCaptain();
    } else {
      this.captainForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }
}
