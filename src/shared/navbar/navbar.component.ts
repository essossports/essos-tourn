import { Component, inject } from '@angular/core';
import { SharedService } from '../shared.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  sharedService = inject(SharedService);


  collapseNavbar() {
    const navbarCollapse = document.getElementById('navcol-1');
    if (navbarCollapse!.classList.contains('show')) {
      navbarCollapse!.classList.remove('show');
    }
  }
}
