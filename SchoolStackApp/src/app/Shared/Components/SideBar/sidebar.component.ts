import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../Services/sidebar.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SavedQuestion } from '../../Models/SavedQuestion';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SidebarComponent implements OnInit {
  isOpen = false;
  categories: any[] = [];
  userId: number = 1; // Replace with actual user ID

  constructor(private sidebarService: SidebarService, private router: Router) {}

  ngOnInit() {
    this.sidebarService.sidebarState$.subscribe(state => {
      this.isOpen = state;
      this.loadCategories();
    });
  }

  toggleSidebar() {
    this.sidebarService.toggle();
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
    this.updateCategoriesWithQuestions();
  }

  updateCategoriesWithQuestions(): void {
    const questionKeys = Object.keys(localStorage).filter(key => key.startsWith('question-'));
    for (const key of questionKeys) {
      const question = JSON.parse(localStorage.getItem(key) || '{}') as SavedQuestion;
      const category = this.categories.find(cat => cat.value === question.categoryName);
      if (category && !category.questions.find((q: any) => q.link === question.link)) {
        category.questions.push(question);
      }
    }
  }

  openQuestion(question: SavedQuestion): void {
    sessionStorage.setItem('selectedQuestion', JSON.stringify(question));
    this.router.navigate(['/question'], { state: { question } }).then(() => {
      this.router.navigateByUrl('/question', { state: { question } });
    });
  }

  addCategory(): void {
    const newCategory = prompt('Enter new category name:');
    if (newCategory) {
      const categoryKey = `categories-${this.userId}`;
      this.categories.push({ label: newCategory, value: newCategory.toLowerCase(), questions: [] });
      localStorage.setItem(categoryKey, JSON.stringify(this.categories));
    }
  }

  deleteCategory(categoryValue: string): void {
    const confirmDelete = confirm('Are you sure you want to delete this category? All questions will be moved to Uncategorized.');
    if (confirmDelete) {
      const categoriesKey = `categories-${this.userId}`;
      const uncategorizedCategory = this.categories.find(cat => cat.value === 'uncategorized');
      const categoryToDelete = this.categories.find(cat => cat.value === categoryValue);

      if (categoryToDelete && uncategorizedCategory) {
        categoryToDelete.questions.forEach((question: any) => {
          question.categoryName = 'uncategorized';
          const questionKey = `question-${question.link}-${this.userId}`;
          localStorage.setItem(questionKey, JSON.stringify(question));
        });
        uncategorizedCategory.questions.push(...categoryToDelete.questions);
        this.categories = this.categories.filter(cat => cat.value !== categoryValue);
        localStorage.setItem(categoriesKey, JSON.stringify(this.categories));
      }
    }
  }
}