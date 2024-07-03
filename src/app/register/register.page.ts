import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoginService } from '../services/login.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
})
export class RegisterPage implements OnInit {

    public userName= '';
    public password= '';
    public email= '';
    public dateOfBirth = new Date().toISOString();
  

  private loginService = inject(LoginService);

  ngOnInit() {
    if (localStorage.getItem('token')) this.router.navigate(['/tabs']);
    return;
  }

  constructor(
    public loadingController: LoadingController,
    private router: Router,
    private toastController: ToastController
  ) {}

  register = async () => {
    try {

      console.log(this.userName, this.password, this.email, this.dateOfBirth)
      if (
        this.dateOfBirth === '' ||
        this.password === '' ||
        this.email === '' ||
        this.userName === ''
      ) {
        await this.presentToastError('top', 'Todos los campos son requeridos');
        return;
      }

      await this.presentLoading();
      const parsedData = {
        userName: this.userName,
        email: this.email,
        dateOfBirth: this.dateOfBirth.split('T')[0],
        password: this.password
      }
      
      const result = (await this.loginService.sendRegisterRequest(
        parsedData
      )) as any;

      if (!result || result?.error) {
        throw new Error(`Ocurrio un error al registrarse`);
      }
      await this.presentToastSuccess();
    } catch (error) {
      await this.presentToastError('bottom', error);
      console.error(`Error al registrarse ${error}`);
    } finally {
      await this.loadingController.dismiss();
    }
  };

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
      message: 'Vaya a su correo para activar!',
      duration: 1000,
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
      message: 'Error al registar',
      duration: 1000,
      position: position,
      color: 'danger',
      icon: 'close-circle-outline',
    });

    await toast.present();
  }
}

type ItemsOptions = ['userName', 'password', 'email', 'dateOfBirth'];
