import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonInputPasswordToggle,
  IonDatetimeButton,
  IonModal,
  IonButton,
  IonInput,
  IonDatetime,
} from '@ionic/angular/standalone';
import { LoginService } from '../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonDatetime,
    IonInput,
    IonButton,
    IonModal,
    IonDatetimeButton,
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonInputPasswordToggle,
    RouterLink,
  ],
})
export class ProfilePage implements OnInit {
  public userName = '';
  public password = '';
  public email = '';
  public dateOfBirth = new Date().toISOString();
  public role = '';
  public idArtist?: string = '';
  public loginService = inject(LoginService);
  public renderingArtist = false

  constructor(
    public loadingController: LoadingController,
    public router: Router,
    public toastController: ToastController
  ) {}

  async ngOnInit() {
    try {
      await this.presentLoading();
      const data = (await this.loginService.obtainDataUser()) as any;

      const formattedDateOfBirth = data.dateOfBirth.split('T')[0];

      this.userName = data.userName;
      this.email = data.email;
      this.dateOfBirth = formattedDateOfBirth;
      this.role = data.role;
      this.idArtist = data.idArtist;

      console.log(this.role === 'artist' && this.idArtist)
      if(this.role === 'artist' && this.idArtist) {
        this.renderingArtist = true
      }

      console.log(this.renderingArtist)
      await this.presentToastSuccess('bottom');
    } catch (error) {
      await this.presentToastError('bottom', error);
      console.error(error);
    } finally {
      this.loadingController.dismiss();
    }
  }

  async updateDataUser() {
    const dataToUpdate: any = {
      userName: this.userName,
      email: this.email,
      dateOfBirth: this.dateOfBirth.split('T')[0],
    };

    if (this.password) {
      dataToUpdate.password = this.password;
    }

    await this.loginService.updateDataUser(dataToUpdate);
  }

  async handleCLickUpdate() {
    try {
      await this.presentLoading();
      await this.updateDataUser();
      await this.presentToastSuccess('bottom');
    } catch (error) {
      await this.presentToastError('bottom', error);
      console.error(error);
    } finally {
      this.loadingController.dismiss();
    }
  }

  async deleteAccount() {
    const mensajeInfo = 'Cuenta eliminada correctamente';
    try {
      await this.presentLoading();
      await this.loginService.deleteAccount();
      await this.presentToastSuccess('bottom', mensajeInfo);
      this.router.navigate(['/main']);
    } catch (error) {
      await this.presentToastError('bottom', error);
      console.error(error);
    } finally {
      this.loadingController.dismiss();
    }
  }

  // Metodos diferidos
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      translucent: true,
    });
    return await loading.present();
  }

  async presentToastSuccess(
    position: 'top' | 'middle' | 'bottom' = 'bottom',
    message: string = 'Datos actualizados correctamente'
  ) {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
      position: position,
      color: 'success',
    });

    await toast.present();
  }

  async presentToastError(
    position: 'top' | 'middle' | 'bottom' = 'bottom',
    error: any
  ) {
    const toast = await this.toastController.create({
      message: error ? error : 'Ocurrio un error',
      duration: 1000,
      position: position,
      color: 'danger',
    });

    await toast.present();
  }
}
