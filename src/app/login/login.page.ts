import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,

  imports: [CommonModule, FormsModule, IonicModule],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  loginService = inject(LoginService);

  ngOnInit() {}

  async login() {
    alert(`${this.username} y ${this.password}`);
    const response = await this.loginService.sendLoginRequest(
      this.username,
      this.password
    );
    console.log(response);
  }
}
