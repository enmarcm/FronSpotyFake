import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonModal } from '@ionic/angular';
import { SongSearchService } from '../services/song-search.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { addCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { TypeaheadComponent } from '../typehead/typehead.component';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.page.html',
  styleUrls: ['./playlists.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TypeaheadComponent],
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
    addIcons({ addCircleOutline });
  }

  public newPlaylist = {
    name: '',
    description: '',
    idSongs: [],
  };

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
    this.setOpen(false);
  }

  async confirm() {
    this.setOpen(false);
    const newFormatPlaylist = {
      ...this.newPlaylist,
      idSongs: this.selectedSongs,
    };

    try {
      await this.presentLoading();
      const response = await this.songSearchService.newPlaylist(
        newFormatPlaylist
      );

      if (response?.error) {
        throw response.error;
      }

      this.playlists = await this.songSearchService.getPlaylists();
      await this.presentToastSuccess();
    } catch (error) {
      await this.presentToastError('top', error);
      console.error(`Ocurrio un error`, error);
    } finally {
      await this.dismissLoading();
      this.selectedSongs = [];
      this.songs = [];
    }
  }

  deletePlaylist = async (playlistId: string) => {
    try {
      await this.presentLoading();

      const response = await this.songSearchService.deletePlaylist(playlistId);

      if (response?.error) {
        throw response.error;
      }

      this.playlists = await this.songSearchService.getPlaylists();
      await this.presentToastSuccess();
    } catch (error) {
      await this.presentToastError('top', error);
      console.error(`Ocurrio un error`, error);
    } finally {
      await this.dismissLoading();
    }
  };

  goToPlaylist = (playlistId: string) =>
    this.router.navigate(['/playlist', playlistId]);

  goToLikes = () => this.router.navigate(['/likes']);

  async presentToastError(
    position: 'top' | 'middle' | 'bottom' = 'bottom',
    error: any
  ) {
    const toast = await this.toastController.create({
      message: 'Error al cargar las playlists ' + error || 'Error desconocido',
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

  // TODO: QUITAR ESTO
  public isModalOptions = false;
  public selectedSongsText = '0 Items';
  public selectedSongs = [];
  public songs = [] as any;
  public page = 0;
  public prevName = '';

  public obtainSongByName = async (name: string) => {
    try {
      this.prevName = name;
      if (this.prevName !== name) {
        this.page += 1;
      } else {
        this.page = 1;
      }
      const parsedName = name.trim().replace(/ /g, '%20');

      const response = await this.songSearchService.getSongByName(
        parsedName,
        this.page
      );

      if (response.length > 0) {
        this.songs = [...this.songs, ...response];
      } else {
        await this.presentToastError('top', 'No se encontraron canciones');
      }

      return this.songs;
    } catch (error) {
      await this.presentToastError('top', error);
      console.error(`Ocurrio un error`, error);
    }
  };

  public updateSelectedItems(event: any) {
    console.log(event);
    this.selectedSongs = event;
  }

  private formatData(data: Array<{ id: string; text: string }>) {
    if (data.length === 1) {
      return data[0].text;
    }

    return `${data.length} items`;
  }

  selectionChange(items: Array<{ id: string; text: string }>) {
    this.selectedSongs = items as any;

    this.selectedSongsText = this.formatData(items);

    this.isModalOptions = false;
  }
}

interface Playlist {
  idSongs: Array<string>;
  name: string;
  id: string;
  _id: string;
}
