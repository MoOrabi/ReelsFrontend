import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

    constructor(private authService: AuthService, 
        private tokenStorage: TokenStorageService,
        private router: Router) {}
    
    ngOnInit(): void {
        if (this.tokenStorage.getToken()) {
          this.isLoggedIn = true;
        }
    }

    form: any = {
        username: null,
        password: null
    };

    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';


    login(){
        const {username, password} = this.form
        this.authService.login(username, password)
        .subscribe({
            next: (data) => {
                this.tokenStorage.saveToken(data['token']);
                this.tokenStorage.saveUser(data);
        
                this.isLoginFailed = false;
                this.isLoggedIn = true;
                window.location.href = 'home'
                this.router.navigate(['/home'])
                
            },
            error: (err) => {
            this.errorMessage = err.error.message;
            this.isLoginFailed = true;
            }
        })
    }



  getUserInfo(email) {
    alert(email);
    fetch('https://localhost:8082/api/v1/users/un/' + email.toLowerCase(), {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem("token")
          }
      }).then(response => {
          return response.json();
      }).then((response) => {
      localStorage.setItem('connectedUser', JSON.stringify(response));
      }).catch(error => {
          console.error('GET request error', error);
      });
  }


}
