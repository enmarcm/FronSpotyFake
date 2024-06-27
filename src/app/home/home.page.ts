import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import songsMocks from '../../mocks/music.json';
import artistMocks from '../../mocks/artist.json';
import { ItemCardComponent } from '../item-card/item-card.component';
import { ItemArtistComponent } from '../item-artist/item-artist.component';
import albumMocks from '../../mocks/album.json';
import { SongSearchService } from '../services/song-search.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemCardComponent,
    ItemArtistComponent,
  ],
})
export class HomePage implements OnInit {
  songSearchService = inject(SongSearchService);

  constructor(
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {}

  public songs: any[] = songsMocks;
  public artists: any[] = artistMocks;
  public albums: any[] = albumMocks;

  async ngOnInit() {
    try {
      await this.presentLoading();
      const responseSongs = await this.songSearchService.getTopSongs();
      const responseArtists = await this.songSearchService.getTopArtist();
      const responseAlbums = await this.songSearchService.getNewAlbums();

      this.songs = responseSongs;
      this.artists = responseArtists;
      this.albums = responseAlbums;
      await this.presentToastSuccess('bottom');
    } catch (error) {
      await this.presentToastError('bottom', error);
    } finally {
      await this.dismissLoading();
    }
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

  async presentToastError(
    position: 'top' | 'middle' | 'bottom' = 'bottom',
    error: any
  ) {
    const toast = await this.toastController.create({
      message: 'Error al cargar las ultimas canciones',
      duration: 1500,
      position: position,
      color: 'danger',
      icon: 'close-circle-outline',
    });

    await toast.present();
  }

  async presentToastSuccess(position: 'top' | 'middle' | 'bottom' = 'bottom') {
    const toast = await this.toastController.create({
      message: `Ha cargado con éxito!`,
      duration: 1500,
      position: position,
      color: 'success',
      icon: 'checkmark-circle-outline',
    });

    await toast.present();
  }
}
