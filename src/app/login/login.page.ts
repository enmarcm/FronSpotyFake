import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController } from '@ionic/angular';
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

  constructor(public loadingController: LoadingController) {}

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Iniciando sesion...',
      translucent: true,
    });
    return await loading.present();
  }

  async login() {
    try {
      await this.presentLoading();
      await this.loginService.sendLoginRequest(this.username, this.password);
    } catch (error) {
      console.error('Error al iniciar sesion', error);
    } finally {
      await this.loadingController.dismiss();
    }
  }
}
