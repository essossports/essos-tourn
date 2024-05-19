import { Component } from '@angular/core';
import { InputFieldComponent } from '../../shared/input-field/input-field.component';

@Component({
  selector: 'app-tourn-form',
  standalone: true,
  imports: [InputFieldComponent],
  templateUrl: './tourn-form.component.html',
  styleUrl: './tourn-form.component.css'
})
export class TournFormComponent {
  team_name: string = "";
  captain_name: string = "";
  phone_number: string = "";
  email: string = "";
  address: string = "";
  city: string = "";
  state: string = "";
  zip: string = "";
  player1: string = "";
  player2: string = "";
  player3: string = "";
  player4: string = "";
  player5: string = "";
  player6: string = "";
  player7: string = "";
  player8: string = "";
  player9: string = "";
  player10: string = "";
  player1_number: string = "";
  player2_number: string = "";
  player3_number: string = "";
  player4_number: string = "";
  player5_number: string = "";
  player6_number: string = "";
  player7_number: string = "";
  player8_number: string = "";
  player9_number: string = "";
  player10_number: string = "";
}
