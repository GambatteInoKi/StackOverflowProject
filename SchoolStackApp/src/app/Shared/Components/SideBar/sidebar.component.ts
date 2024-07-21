import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../Services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
})
export class SidebarComponent implements OnInit {
    isOpen = false;
  
    constructor(private sidebarService: SidebarService) {}
  
    ngOnInit() {
      this.sidebarService.sidebarState$.subscribe(state => {
        this.isOpen = state;
      });
    }
  
    toggleSidebar() {
      this.sidebarService.toggle();
    }
  }