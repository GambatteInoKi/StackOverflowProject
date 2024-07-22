import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../../Services/sidebar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
})
export class NavbarComponent {
  constructor(private sidebarService: SidebarService, private router: Router) {}

  toggleSidebar() {
    this.sidebarService.toggle();
  }

  navigateToSearch() {
    this.router.navigate(['/search']);
  }
}
