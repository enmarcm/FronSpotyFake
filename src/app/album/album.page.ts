import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { PlayButtomComponent } from '../play-buttom/play-buttom.component';
import { SongSearchService } from '../services/song-search.service';
import getDominantColorHex from 'src/utils/getColorFromUrl';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, PlayButtomComponent],
})
export class AlbumPage implements OnInit {
  songSearchService = inject(SongSearchService);

  public idAlbum: string = '';
  public name: string = '';
  public urlImage: string = '';
  public date: string = '';
  public totalTracks: number = 0;
  public artists: Array<any> = [];
  public songs: Array<any> = [];
  public dominantColor = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    public toastController: ToastController,
    private router: Router
  ) {
    this.idAlbum = this.activatedRoute.snapshot.paramMap.get('idAlbum') || '';
  }

  async ngOnInit() {
    try {
      await this.presentLoading();
      const response = await this.songSearchService.getAlbumInfo(this.idAlbum);

      this.dominantColor = await getDominantColorHex(response.urlImage);
      this.idAlbum = response.id;
      this.name = response.name;
      this.urlImage = response.urlImage;
      this.date = response.release_date;
      this.totalTracks = response.total_tracks;
      this.artists = response.artists;
      this.songs = response.songs;
      await this.presentToastSuccess('bottom');
    } catch (error) {
      await this.presentToastError('bottom', error);
      this.router.navigate(['/home']);
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

  async presentToastSuccess(position: 'top' | 'middle' | 'bottom' = 'bottom') {
    const toast = await this.toastController.create({
      message: `Se obtuvo el artista ${this.name}!`,
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
      message: 'Error al cargar el artista',
      duration: 1500,
      position: position,
      color: 'danger',
      icon: 'close-circle-outline',
    });

    await toast.present();
  }

  getGradientStyle(color: string): string {
    return `linear-gradient(to bottom, ${color} -40%, black 40%)`;
  }

  goToSong(idSong: string) {
    this.router.navigate(['/song', idSong]);
  }

  goToArtist(idArtist: string) {
    this.router.navigate(['/artist', idArtist]);
  }
}


