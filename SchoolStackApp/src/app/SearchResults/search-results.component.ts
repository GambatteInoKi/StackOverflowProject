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
      this.keyword = params['keyword'] || sessionStorage.getItem('lastSearchQuery') || '';
      this.tag = params['tag'] || '';
      if (this.keyword) {
        this.searchQuestions();
      } else {
        this.router.navigate(['/search']);
      }
    });
  }

  searchQuestions(): void {
    this.loading = true;

    this.http.get<SavedQuestion[]>(`http://localhost:5000/search`, {
      params: {
        keyword: this.keyword || '',
        tag: this.tag || '',
      }
    }).subscribe(
      data => {
        this.questions = data.sort((a, b) => b.score - a.score);
        this.loading = false;
      },
      error => {
        console.error('Error fetching questions', error);
        this.loading = false;
      }
    );
  }

  onSearch(): void {
    if (this.keyword?.trim()) {
      sessionStorage.setItem('lastSearchQuery', this.keyword);
      this.router.navigate(['/search-results'], { queryParams: { keyword: this.keyword } });
    }
  }
  
  onQuestionClick(question: SavedQuestion): void {
    sessionStorage.setItem('selectedQuestion', JSON.stringify(question));
    this.router.navigate(['/question']);
  }
  
}
