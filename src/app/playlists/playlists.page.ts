import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonModal } from '@ionic/angular';
import { SongSearchService } from '../services/song-search.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import {  addCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';



@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.page.html',
  styleUrls: ['./playlists.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class PlaylistsPage implements OnInit {


  public playlists: Array<Playlist> = [];
  public imageBase =
    'https://img.freepik.com/vector-gratis/gradiente-azul-rosa_78370-260.jpg';

  constructor(
    private songSearchService: SongSearchService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private router: Router
  ) {
    addIcons({addCircleOutline})
  }

  async ngOnInit() {
    try {
      await this.presentLoading();

      const response = await this.songSearchService.getPlaylists();

      this.playlists = response;

      await this.presentToastSuccess();
    } catch (error) {
      await this.presentToastError('top', error);
      console.error(`Ocurrio un error`, error);
      this.router.navigate(['/tabs']);
    } finally {
      await this.dismissLoading();
    }
  }
  isModalOpen = false;


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  cancel() {
    this.setOpen(false)
  }

  confirm() {
    //Guardar Datos
    this.setOpen(false)
  }

  deletePlaylist = async (playlistId: string) => {
    console.log(playlistId)
  }

  goToPlaylist = (playlistId: string) =>
    this.router.navigate(['/playlist', playlistId]);

  goToLikes = () => this.router.navigate(['/likes']);

  async presentToastError(
    position: 'top' | 'middle' | 'bottom' = 'bottom',
    error: any
  ) {
    const toast = await this.toastController.create({
      message: 'Error al cargar las playlists',
      duration: 1500,
      position: position,
      color: 'danger',
      icon: 'close-circle-outline',
    });

    await toast.present();
  }

  async presentToastSuccess(position: 'top' | 'middle' | 'bottom' = 'bottom') {
    const toast = await this.toastController.create({
      message: `Se obtuvieron las playlists!`,
      duration: 500,
      position: position,
      color: 'success',
      icon: 'checkmark-circle-outline',
    });

    await toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      translucent: false,
      animated: true,
      spinner: 'bubbles',
      cssClass: 'custom-loader-songs',
    });

    return await loading.present();
  }

  async dismissLoading() {
    return await this.loadingController.dismiss();
  }
}

interface Playlist {
  idSongs: Array<string>;
  name: string;
  id: string;
  _id: string;
}
