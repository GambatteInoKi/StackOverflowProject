import { Routes } from '@angular/router';
import { HomeComponent } from './Home/home.component';
import { SearchComponent } from './Search/search.component'; 
import { SearchResultsComponent } from './SearchResults/search-results.component';
import { AuthGuard } from '../infrastucture/Guards/auth.guard';
import { SearchGuard } from '../infrastucture/Guards/search.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'search', canActivate: [AuthGuard], component: SearchComponent },
    { path: 'search-results', canActivate: [AuthGuard], component: SearchResultsComponent },
    { path: '**', redirectTo: '' }
];
