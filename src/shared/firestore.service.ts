import { Injectable } from '@angular/core';
import { DocumentData, collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor() { }

  private db = getFirestore();
  
  async getTournaments(fieldKey:string): Promise<DocumentData[]> {
    console.log("firestore getLiveTournaments");
    const q = query(
      collection(this.db, 'tournament'),
      where(fieldKey, '==', true)
    );
    const querySnapshot = await getDocs(q);
    const tournaments = querySnapshot.docs.map(doc => doc.data());
    return tournaments;
  }
}
