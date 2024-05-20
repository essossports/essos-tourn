import { Injectable } from '@angular/core';
import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  QuerySnapshot,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { TournTeam, tournTeamConverter } from '../models/tourn-team';
import { Tournament, tournamentConverter } from '../models/tournament';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor() {}

  private db = getFirestore();

  async getTournaments(fieldKey: string): Promise<DocumentData[]> {
    console.log('firestore getLiveTournaments');
    const q = query(
      collection(this.db, 'tournament'),
      where(fieldKey, '==', true)
    );
    const querySnapshot = await getDocs(q);
    const tournaments = querySnapshot.docs.map((doc) => doc.data());
    return tournaments;
  }

  async getTournament(tournId:string): Promise<Tournament|undefined> {
    console.log('firestore getTournament');
    const docRef = doc(this.db, "tournament", tournId).withConverter(tournamentConverter);
    const docSnap  = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return undefined;
    }
  }

  async createTournTeam(data: TournTeam) {
    console.log('firestore createTournTeam');
    const collectionRef = collection(this.db, 'tournTeam').withConverter(tournTeamConverter);
    const docRef = await addDoc(collectionRef, { ...data });
    await setDoc(docRef, { ...data, id: docRef.id });
    return docRef.id;
  }

  async getTournTeamWithMobile(tournId:string, captainMobile:string):Promise<QuerySnapshot<DocumentData, DocumentData>> {
    console.log('firestore getTournTeamWithMobile');
    const q = query(collection(this.db, "tournTeam"), where("tournId", "==", tournId), where("captainMobile", "==", captainMobile));
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  }

  async getTournTeam(tournTeamId:string): Promise<TournTeam | undefined> {
    console.log('firestore getTournTeam');
    const docRef = doc(this.db, "tournTeam", tournTeamId).withConverter(tournTeamConverter);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return undefined;
    }
  }

  async updateTournTeam(tournTeamId:string, tournTeam: TournTeam) {
    console.log('firestore updateTournTeam');
    const docRef = doc(this.db, "tournTeam", tournTeamId).withConverter(tournTeamConverter);
    await setDoc(docRef, tournTeam);
  }
}
