import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PrimeNGConfig } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../Shared/Components/NavBar/navbar.component';
import { SidebarComponent } from '../Shared/Components/SideBar/sidebar.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { SavedQuestion } from '../Shared/Models/SavedQuestion';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, FormsModule, CommonModule, TableModule],
})
export class SearchResultsComponent implements OnInit {
  keyword: string | null = '';
  tag: string | null = '';
  questions: SavedQuestion[] = []; 
  totalRecords: number = 0;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.route.queryParams.subscribe(params => {
      this.keyword = params['keyword'] || '';
      this.tag = params['tag'] || '';
      this.searchQuestions(0);
    });
  }

  searchQuestions(page: number): void {
    const limit = 10;
    const offset = page * limit;
    this.loading = true;

    this.http.get<SavedQuestion[]>(`http://localhost:5000/search`, {
      params: {
        keyword: this.keyword || '',
        tag: this.tag || '',
      }
    }).subscribe(
      data => {
        this.questions = data.slice(offset, offset + limit);
        this.totalRecords = Math.min(data.length, 50);
        this.loading = false;
        console.log(data);
      },
      error => {
        console.error('Error fetching questions', error);
        this.loading = false;
      }
    );
  }

  onSearch(): void {
    if (this.keyword?.trim()) {
      this.router.navigate(['/search-results'], { queryParams: { keyword: this.keyword } });
    }
  }
}
