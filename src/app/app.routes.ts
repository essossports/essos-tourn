import { Routes } from '@angular/router';
import { HomeComponent } from '../screens/home/home.component';
import { PreviousComponent } from '../screens/previous/previous.component';
import { PreviousDetailComponent } from '../screens/previous-detail/previous-detail.component';
import { UpcomingComponent } from '../screens/upcoming/upcoming.component';
import { TournFormComponent } from '../screens/tourn-form/tourn-form.component';
import { LandingTournamentComponent } from '../screens/landing-tournament/landing-tournament.component';

export const routes: Routes = [
    // {path:"home", component:HomeComponent},
    {path:"previous", component:PreviousComponent},
    {path:"previous-detail", component:PreviousDetailComponent},
    {path:"upcoming", component:UpcomingComponent},
    {path:"tourn-form", component:TournFormComponent},
    {path: '', component: LandingTournamentComponent, pathMatch: 'full'},
    {path: '**', redirectTo: '/'},
];
