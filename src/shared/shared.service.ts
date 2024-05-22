import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  landing:boolean|null = null;
  tournamentId:string = "";
  tournFormId:string = "";
  isTournApplyVisible: boolean = false;

  
  captainForm = new FormGroup({
    name: new FormControl('', Validators.required),
    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern('^\\d{10}$'),
    ]),
  });

  constructor() { }
}
