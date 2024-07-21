import { Component, Input, input } from '@angular/core';
import { LoginComponent } from './Components/Login/login.component';
import { RegisterComponent } from './Components/Register/register.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [LoginComponent, RegisterComponent],
})
export class HomeComponent {

  constructor() {
    
  }

}