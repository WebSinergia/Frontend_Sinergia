import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private validUsername: string = 'admin';
  private validPassword: string = 'admin';

  constructor(private router: Router){

  }

  login() {
    const usernameInput = (document.getElementById('username') as HTMLInputElement).value;
    const passwordInput = (document.getElementById('password') as HTMLInputElement).value;

    if (usernameInput === this.validUsername && passwordInput === this.validPassword) {
      this.router.navigate(['/user-list']);
    } else {
      // Si los valores son incorrectos, muestra un mensaje de error
      alert('Invalid username or password');
    }
  }
}
