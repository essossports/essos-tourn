import {
  DocumentData,
  DocumentSnapshot,
  FirestoreDataConverter,
  SnapshotOptions,
  Timestamp,
} from 'firebase/firestore';

//   team name, captain name, mobile, email
// address, city, state, zip
// players & number
export class Player {
  constructor(public name: string, public mobile: string) {}
}

export class TournTeam {
  constructor(
    public id: string,
    public tournId: string,
    public date: Timestamp,
    public teamName: string,
    public captainName: string,
    public captainMobile: string,
    public email: string,
    public address: string,
    public city: string,
    public state: string,
    public zip: string,
    public players: Player[]
  ) {}

  [key: string]: any;
}

export const tournTeamConverter: FirestoreDataConverter<TournTeam> = {
  toFirestore(tournTeam: TournTeam): DocumentData {
    const data: any = {
      id: tournTeam.id,
      tournId: tournTeam.tournId,
      date: tournTeam.date,
      teamName: tournTeam.teamName,
      captainName: tournTeam.captainName,
      captainMobile: tournTeam.captainMobile,
      email: tournTeam.email,
      address: tournTeam.address,
      city: tournTeam.city,
      state: tournTeam.state,
      zip: tournTeam.zip,
      players: tournTeam.players.map(player => ({ name: player.name, mobile: player.mobile })),    
    };
    // Remove undefined fields
    Object.keys(data).forEach((key) => {
      if (data[key] === undefined) {
        delete data[key];
      }
    });

    return data;
  },
  fromFirestore(
    snapshot: DocumentSnapshot,
    options: SnapshotOptions
  ): TournTeam {
    const data = snapshot.data(options)!;
    return new TournTeam(
      data['id'],
      data['tournId'],
      data['date'],
      data['teamName'],
      data['captainName'],
      data['captainMobile'],
      data['email'],
      data['address'],
      data['city'],
      data['state'],
      data['zip'],
      data['players'].map((player: any) => ({ name: player.name, mobile: player.mobile })),    
    );
  },
};
