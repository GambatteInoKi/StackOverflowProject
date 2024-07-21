import { Component } from '@angular/core';
import { NavbarComponent } from '../Shared/Components/NavBar/navbar.component';
import { SidebarComponent } from '../Shared/Components/SideBar/sidebar.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  standalone: true,
  imports: [NavbarComponent, SidebarComponent],
})
export class QuestionComponent {

  constructor() {
    
  }

}