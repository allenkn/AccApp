import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
  providers: [UserService]
})
export class ClientListComponent implements OnInit {
  register;

  constructor(private userService:UserService) {}

// have to put the function into the components.ts file that I want to have the input in.
//
  ngOnInit() {
    this.register = {
      username: '',
      password: '',
      email: ''
    };
  }

  registerUser(){
    this.userService.registerNewUser(this.register).subscribe(
      response => {
        alert('User ' + this.register.username + ' has been created!')
      },
      error => console.log('error', error)
    );
  }



}
