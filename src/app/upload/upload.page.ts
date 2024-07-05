import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonCardSubtitle,
  IonInput,
  IonButton,
  IonCol,
} from '@ionic/angular/standalone';
import { UploadService } from '../upload.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { SongSearchService } from '../services/song-search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonButton,
    IonInput,
    IonCardSubtitle,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCard,
    IonRow,
    IonGrid,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class UploadPage implements OnInit {
  private BASE_URL_IMAGE_DEFAULT =
    'https://st.depositphotos.com/1605581/2757/i/450/depositphotos_27575223-stock-photo-blue-gradient-background.jpg';

  public selectedFileSong: File | null = null;
  public selectedFileImage: File | null = null;

  public urlSong = '';
  public urlImage = this.BASE_URL_IMAGE_DEFAULT;
  public songName = '';
  public albumName = '';
  public duration = 100;

  constructor(
    public uploadService: UploadService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public searchSongService: SongSearchService,
    public router: Router
  ) {}

  ngOnInit() {
    this.songName = 'Primera cancion';
    this.albumName = 'Esto es epico';
  }

  onFileSelectedImage(event: any): void {
    this.selectedFileImage = event.target.files[0];

    if (this.selectedFileImage) {
      this.uploadFileImage();
    }
  }

  onFileSelectedSong(event: any): void {
    this.selectedFileSong = event.target.files[0];

    if (this.selectedFileSong) {
      this.calculateDuration(this.selectedFileSong);
      this.uploadFileSong();
    }
  }

  async uploadFileImage(): Promise<void> {
    try {
      await this.presentLoading();
      if (this.selectedFileImage) {
        try {
          const url = await this.uploadService
            .uploadFile(this.selectedFileImage)
            .toPromise();
          console.log('File uploaded! URL:', url);
          if (!url) throw new Error('Error uploading file');
          this.urlImage = url;
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
      await this.presentToastSuccess();
    } catch (error) {
      console.error('Error uploading file:', error);
      await this.presentToastError('bottom', 'Error al subir la imagen');
    } finally {
      await this.loadingController.dismiss();
    }
  }

  async uploadFileSong(): Promise<void> {
    if (this.selectedFileSong) {
      console.log('Cargando archivo de canción...');
      try {
        await this.presentLoading();
        const url = await this.uploadService
          .uploadFile(this.selectedFileSong)
          .toPromise();
        console.log('File uploaded! URL:', url);
        if (!url) throw new Error('Error uploading file');
        this.urlSong = url;
        await this.presentToastSuccess();
      } catch (error) {
        console.error('Error uploading file:', error);
        await this.presentToastError('bottom', 'Error al subir la canción');
      } finally {
        await this.loadingController.dismiss();
      }
    }
  }

  calculateDuration(file: File): void {
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const reader = new FileReader();

    reader.onload = (e: any) => {
      audioContext.decodeAudioData(e.target.result, (buffer) => {
        const duration = buffer.duration * 1000;

        this.duration = duration;

        console.log('Duration in milliseconds:', duration);
      });
    };

    reader.readAsArrayBuffer(file);
  }

  async uploadSong() {
    if (!this.songName || !this.albumName || !this.urlSong) {
      await this.presentToastError('top', 'Faltan datos por completar');
    }

    try {
      const song = {
        name: this.songName,
        albumName: this.albumName,
        duration: this.duration,
        urlSong: this.urlSong,
        urlImage: this.urlImage,
        date: new Date().toISOString().split('T')[0],
      };

      await this.presentLoading();
      const result = await this.searchSongService.uploadSong(song);

      if(result?.error) throw new Error(result.error);

      await this.presentToastSuccess();
      this.router.navigate(['/tabs/home']);
    } catch (error) {
      console.error(error);
      await this.presentToastError('bottom', error);
    } finally {
      await this.loadingController.dismiss();
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      translucent: true,
    });
    return await loading.present();
  }

  async presentToastSuccess(position: 'top' | 'middle' | 'bottom' = 'bottom') {
    const toast = await this.toastController.create({
      message: 'Cargó con éxito!',
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
      message: error ? error : 'Error',
      duration: 1000,
      position: position,
      color: 'danger',
      icon: 'close-circle-outline',
    });

    await toast.present();
  }
}
