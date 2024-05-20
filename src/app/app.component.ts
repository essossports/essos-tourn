import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../screens/home/home.component';
import { SharedService } from '../shared/shared.service';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { PreviousComponent } from '../screens/previous/previous.component';
import { PreviousDetailComponent } from '../screens/previous-detail/previous-detail.component';
import { UpcomingComponent } from '../screens/upcoming/upcoming.component';
import { Firestore } from '@angular/fire/firestore';
import { LoadingComponent } from '../shared/loading/loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    HomeComponent,
    NavbarComponent,
    PreviousComponent,
    PreviousDetailComponent,
    UpcomingComponent,
    LoadingComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  firestore = inject(Firestore);
  sharedService = inject(SharedService);
  title = 'essos-tourn';
}
