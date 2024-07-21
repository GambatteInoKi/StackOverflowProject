import { Component, Input, input } from '@angular/core';
import { NavbarComponent } from '../Shared/Components/NavBar/navbar.component';
import { SidebarComponent } from '../Shared/Components/SideBar/sidebar.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [NavbarComponent, SidebarComponent],
})
export class SearchComponent {

  constructor() {
    
  }

}