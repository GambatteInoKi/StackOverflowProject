import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { NavbarComponent } from '../Shared/Components/NavBar/navbar.component';
import { SidebarComponent } from '../Shared/Components/SideBar/sidebar.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [FormsModule, NavbarComponent, SidebarComponent]  
})
export class SearchComponent {
  keyword: string = '';

  constructor(private router: Router) {}

  onSearch(): void {
    if (this.keyword.trim()) {
      this.router.navigate(['/search-results'], { queryParams: { keyword: this.keyword } });
    }
  }
}