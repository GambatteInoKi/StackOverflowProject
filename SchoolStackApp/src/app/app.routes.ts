import { Routes } from '@angular/router';
import { HomeComponent } from './Home/home.component';
import { SearchComponent } from './Search/search.component'; 
import { AuthGuard } from '../infrastucture/Login/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'search', canActivate: [AuthGuard], component: SearchComponent },
    { path: '**', canActivate: [AuthGuard], component: HomeComponent }
];
  