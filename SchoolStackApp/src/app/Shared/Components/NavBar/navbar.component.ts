import { Component } from '@angular/core';
import { SidebarService } from '../../Services/sidebar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
})
export class NavbarComponent {
    constructor(private sidebarService: SidebarService) {}
  
    toggleSidebar() {
      this.sidebarService.toggle();
    }
  }