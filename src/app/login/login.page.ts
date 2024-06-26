import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController } from '@ionic/angular';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

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

  ngOnInit() {
    if (localStorage.getItem('token')) this.router.navigate(['/tabs']);
    return;
  }

  constructor(
    public loadingController: LoadingController,
    private router: Router
  ) {}

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
      const result = (await this.loginService.sendLoginRequest(
        this.username,
        this.password
      )) as any;
      localStorage.setItem('token', result.token);
      this.router.navigate(['/tabs']);
      return;
    } catch (error) {
      console.error('Error al iniciar sesion', error);
    } finally {
      await this.loadingController.dismiss();
    }
  }
}
