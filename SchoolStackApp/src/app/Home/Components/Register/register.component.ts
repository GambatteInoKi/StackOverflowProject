import { Component } from '@angular/core';
import { User } from '../../../Shared/Models/User';
import { FetchService } from '../../../../infrastucture/Services/fetch.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [],
})
export class RegisterComponent {


    signup : User = new User();

    constructor(private fetchService: FetchService) {

    }
    onRegister(){
        this.fetchService.postData('signup', this.signup).subscribe(
            (response) => {
                this.signup = response;
                console.log(this.signup.username + ' has been registered');
            },
            (error) => {
              console.error(error);
            }
          );
      }

}