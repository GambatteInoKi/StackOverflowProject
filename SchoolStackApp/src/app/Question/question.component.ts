import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../Shared/Components/NavBar/navbar.component';
import { SidebarComponent } from '../Shared/Components/SideBar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SavedQuestion } from '../Shared/Models/SavedQuestion';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, CommonModule, FormsModule],
})
export class QuestionComponent implements OnInit, OnDestroy {
  questionDetails: SavedQuestion | null = null;
  categories: any[] = [];
  selectedCategory: string | null = 'default';
  notesEnabled: boolean = false;
  userId: number = 1; // Replace with actual user ID

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['question']) {
      this.questionDetails = navigation.extras.state['question'];
      this.selectedCategory = this.questionDetails?.categoryName || 'default';
      sessionStorage.setItem('selectedQuestion', JSON.stringify(this.questionDetails));
    } else {
      const savedQuestion = sessionStorage.getItem('selectedQuestion');
      if (savedQuestion) {
        this.questionDetails = JSON.parse(savedQuestion);
        this.selectedCategory = this.questionDetails?.categoryName || 'default';
      } else {
        this.router.navigate(['/search']);
      }
    }

    this.loadCategories();
  }

  loadCategories(): void {
    const categoryKey = `categories-${this.userId}`;
    const categoriesString = localStorage.getItem(categoryKey);
    this.categories = categoriesString ? JSON.parse(categoriesString) : [
      { label: 'Python', value: 'python', questions: [] },
      { label: 'Java', value: 'java', questions: [] },
      { label: 'Databases', value: 'databases', questions: [] },
      { label: 'Uncategorized', value: 'uncategorized', questions: [] }
    ];
  }

  saveQuestion(): void {
    if (this.questionDetails) {
      this.questionDetails.categoryName = this.selectedCategory || 'default';
      const questionKey = `question-${this.questionDetails.link}-${this.userId}`;
      localStorage.setItem(questionKey, JSON.stringify(this.questionDetails));
      this.updateCategories();
      this.notesEnabled = true;
      alert('This question is saved');
    }
  }

  updateCategories(): void {
    const categoryKey = `categories-${this.userId}`;
    let categoriesString = localStorage.getItem(categoryKey);
    let categories = categoriesString ? JSON.parse(categoriesString) : this.categories;

    const newCategory = categories.find((cat: any) => cat.value === this.selectedCategory);
    const oldCategory = categories.find((cat: any) => cat.questions.find((q: any) => q.link === this.questionDetails?.link));

    if (oldCategory) {
      oldCategory.questions = oldCategory.questions.filter((q: any) => q.link !== this.questionDetails?.link);
    }

    if (newCategory) {
      newCategory.questions.push(this.questionDetails);
    } else {
      categories.push({ label: this.selectedCategory, value: this.selectedCategory?.toLowerCase(), questions: [this.questionDetails] });
    }

    localStorage.setItem(categoryKey, JSON.stringify(categories));
  }

  loadNotes(): void {
    if (this.questionDetails) {
      const savedNotes = localStorage.getItem(`notes-${this.questionDetails.link}`);
      this.questionDetails.notes = savedNotes || '';
    }
  }

  saveNotes(): void {
    if (this.questionDetails) {
      localStorage.setItem(`notes-${this.questionDetails.link}`, this.questionDetails.notes);
    }
  }

  deleteQuestion(): void {
    if (this.questionDetails) {
      const questionKey = `question-${this.questionDetails.link}-${this.userId}`;
      localStorage.removeItem(questionKey);

      const categoryKey = `categories-${this.userId}`;
      let categoriesString = localStorage.getItem(categoryKey);
      let categories = categoriesString ? JSON.parse(categoriesString) : this.categories;

      const category = categories.find((cat: any) => cat.value === this.questionDetails?.categoryName);
      if (category) {
        category.questions = category.questions.filter((q: any) => q.link !== this.questionDetails?.link);
      }

      localStorage.setItem(categoryKey, JSON.stringify(categories));
      this.router.navigate(['/search-results']);
    }
  }

  moveQuestion(): void {
    if (this.questionDetails && this.selectedCategory) {
      this.questionDetails.categoryName = this.selectedCategory;
      sessionStorage.setItem('selectedQuestion', JSON.stringify(this.questionDetails));
      console.log('Question moved to', this.selectedCategory);
      this.router.navigate(['/search-results']);
    }
  }

  ngOnDestroy(): void {
    if (this.notesEnabled && this.questionDetails) {
      this.saveNotes();
    }
    if (this.questionDetails) {
      sessionStorage.setItem('selectedQuestion', JSON.stringify(this.questionDetails));
    }
  }
}
