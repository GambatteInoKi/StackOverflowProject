import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../Shared/Components/NavBar/navbar.component';
import { SidebarComponent } from '../Shared/Components/SideBar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, CommonModule, FormsModule, DropdownModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class QuestionComponent implements OnInit {
  questionDetails: any = null;
  categories: any[] = [];
  selectedCategory: any = null;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['question']) {
      this.questionDetails = navigation.extras.state['question'];
      sessionStorage.setItem('selectedQuestion', JSON.stringify(this.questionDetails));
    } else {
      const savedQuestion = sessionStorage.getItem('selectedQuestion');
      if (savedQuestion) {
        this.questionDetails = JSON.parse(savedQuestion);
      } else {
        this.router.navigate(['/search']);
      }
    }

    this.categories = [
      { label: 'Default', value: 'default' },
      { label: 'Python', value: 'python' },
      { label: 'Java', value: 'java' },
      { label: 'Databases', value: 'databases' }
    ];
  }
}
