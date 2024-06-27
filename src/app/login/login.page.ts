import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController } from '@ionic/angular';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
    private router: Router,
    private toastController: ToastController
  ) {}

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Iniciando sesion...',
      translucent: true,
    });
    return await loading.present();
  }

  async presentToastSuccess(position: 'top' | 'middle' | 'bottom' = 'bottom') {
    const toast = await this.toastController.create({
      message: 'Has iniciado sesión!',
      duration: 1500,
      position: position,
      color: 'success',
      icon: 'checkmark-circle-outline',
    });

    await toast.present();
  }

  async presentToastError(
    position: 'top' | 'middle' | 'bottom' = 'bottom',
    error: any
  ) {
    const toast = await this.toastController.create({
      message: 'Error al iniciar sesion',
      duration: 1500,
      position: position,
      color: 'danger',
      icon: 'close-circle-outline',
    });

    await toast.present();
  }

  async login() {
    try {
      await this.presentLoading();
      const result = (await this.loginService.sendLoginRequest(
        this.username,
        this.password
      )) as any;
      localStorage.setItem('token', result.token);
      await this.presentToastSuccess();
      this.router.navigate(['/tabs']);
      return;
    } catch (error) {
      await this.presentToastError('bottom', error);
      console.error('Error al iniciar sesion', error);
    } finally {
      await this.loadingController.dismiss();
    }
  }
}
