import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputFieldComponent } from '../../shared/input-field/input-field.component';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../shared/shared.service';
import { TournTeam } from '../../models/tourn-team';
import { FirestoreService } from '../../shared/firestore.service';
import { LoadingService } from '../../shared/loading.service';
import { Router } from '@angular/router';
import { Tournament } from '../../models/tournament';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-tourn-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './tourn-form.component.html',
  styleUrl: './tourn-form.component.css',
})
export class TournFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private firestoreService: FirestoreService,
    private loadingService: LoadingService,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) {}
  tournTeam?: TournTeam;
  tournament?: Tournament;
  safeHtml?: SafeHtml;

  ngOnInit() {
    this.getTournTeam();
  }

  async getTournTeam() {
    this.loadingService.show();
    this.sharedService.tournFormId = 'dbZ6rumWOTROhf48XlGD';
    this.tournTeam = await this.firestoreService.getTournTeam(
      this.sharedService.tournFormId
    );
    this.tournament = await this.firestoreService.getTournament(this.tournTeam?.tournId!);
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.tournament?.formTerms ?? '');
    console.log(this.tournTeam);
    if (this.tournTeam) {
      this.teamForm.patchValue({
        captain: this.tournTeam.captainName,
        mobile: this.tournTeam.captainMobile,
        team_name: this.tournTeam.teamName,
        email: this.tournTeam.email,
        address: {
          street: this.tournTeam.address,
          city: this.tournTeam.city,
          state: this.tournTeam.state,
          zip: this.tournTeam.zip,
        },
      });
      (this.teamForm.get('playerName') as FormArray).clear();
      (this.teamForm.get('playerMobile') as FormArray).clear();

      this.tournTeam.players.forEach((player) => {
        (this.teamForm.get('playerName') as FormArray).push(
          this.formBuilder.control(player.name)
        );
        (this.teamForm.get('playerMobile') as FormArray).push(
          this.formBuilder.control(player.mobile)
        );
      });
    }
    this.loadingService.hide();
  }

  teamForm = this.formBuilder.group({
    captain: [''],
    mobile: [''],
    team_name: ['', Validators.required],
    email: [''],
    address: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
    }),
    playerName: this.formBuilder.array([this.formBuilder.control('')]),
    playerMobile: this.formBuilder.array([this.formBuilder.control('')]),
  });

  get playerName() {
    return this.teamForm.get('playerName') as FormArray;
  }
  get playerMobile() {
    return this.teamForm.get('playerMobile') as FormArray;
  }

  addPlayer() {
    this.playerName.push(this.formBuilder.control(''));
    this.playerMobile.push(this.formBuilder.control(''));
  }
  removePlayer(index: number) {
    this.playerName.removeAt(index);
    this.playerMobile.removeAt(index);
  }

  populateTournTeam() {
    this.tournTeam!.teamName = this.teamForm.value.team_name ?? '';
    this.tournTeam!.email = this.teamForm.value.email ?? '';
    this.tournTeam!.address = this.teamForm.value.address?.street ?? '';
    this.tournTeam!.city = this.teamForm.value.address?.city ?? '';
    this.tournTeam!.state = this.teamForm.value.address?.state ?? '';
    this.tournTeam!.zip = this.teamForm.value.address?.zip ?? '';

    const playerNameArray = this.teamForm.value.playerName;
    const playerMobileArray = this.teamForm.value.playerMobile;
    const players = playerNameArray!.map(
      (name: string | null, index: number) => ({
        name: name ?? '',
        mobile: playerMobileArray![index] ?? '',
      })
    );
    this.tournTeam!.players = players;
  }

  async onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.teamForm.value);
    this.populateTournTeam();
    await this.firestoreService.updateTournTeam(
      this.sharedService.tournFormId,
      this.tournTeam!
    );
    this.router.navigateByUrl("/upcoming")
    alert('Updated successfully');
  }

  // team_name: string = "";
  // captain_name: string = "";
  // phone_number: string = "";
  // email: string = "";
  // address: string = "";
  // city: string = "";
  // state: string = "";
  // zip: string = "";
  // player1: string = "";
  // player2: string = "";
  // player3: string = "";
  // player4: string = "";
  // player5: string = "";
  // player6: string = "";
  // player7: string = "";
  // player8: string = "";
  // player9: string = "";
  // player10: string = "";
  // player1_number: string = "";
  // player2_number: string = "";
  // player3_number: string = "";
  // player4_number: string = "";
  // player5_number: string = "";
  // player6_number: string = "";
  // player7_number: string = "";
  // player8_number: string = "";
  // player9_number: string = "";
  // player10_number: string = "";
}
