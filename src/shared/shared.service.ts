import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  
  tournamentId:string = "";
  tournFormId:string = "";

  constructor() { }
}
