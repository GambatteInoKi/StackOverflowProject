import { Component, Input, input } from '@angular/core';
import { FetchService } from '../../../../infrastucture/Services/fetch.service';
import { AuthService } from '../../../../infrastucture/Services/auth.service';
import { User } from '../../../Shared/Models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [],
})
export class LoginComponent {

    constructor(
        private authService: AuthService) {}

    loginAttempt : User = new User();
    loginResponse : User = new User();
    
    onLogin(loginAttempt: User){
        return this.authService.logIn(loginAttempt);
    }

}