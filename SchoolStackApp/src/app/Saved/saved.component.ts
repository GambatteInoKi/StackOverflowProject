import { Component } from '@angular/core';
import { NavbarComponent } from '../Shared/Components/NavBar/navbar.component';
import { SidebarComponent } from '../Shared/Components/SideBar/sidebar.component';

@Component({
  selector: 'app-saved-questions',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss'],
  standalone: true,
  imports: [NavbarComponent, SidebarComponent],
})
export class SavedComponent {

  constructor() {
    
  }

}