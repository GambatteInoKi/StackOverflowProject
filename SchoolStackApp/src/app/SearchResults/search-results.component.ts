import { Component } from '@angular/core';
import { NavbarComponent } from '../Shared/Components/NavBar/navbar.component';
import { SidebarComponent } from '../Shared/Components/SideBar/sidebar.component';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  standalone: true,
  imports: [NavbarComponent, SidebarComponent],
})
export class SearchResultsComponent {

  constructor() {
    
  }

}