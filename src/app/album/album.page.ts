import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicPlayerService } from '../services/music-player.service';
// import { LoadingController, ToastController } from '@ionic/angular';
import { PlayButtomComponent } from '../play-buttom/play-buttom.component';
import { SongSearchService } from '../services/song-search.service';
import getDominantColorHex from 'src/utils/getColorFromUrl';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonImg, IonCard, IonCardHeader, IonList, IonCardContent, IonCardTitle, IonItem, IonThumbnail, IonLabel } from "@ionic/angular/standalone";

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonCardTitle, IonCardContent, IonList, IonCardHeader, IonCard, IonImg, IonCol, IonRow, IonGrid, IonContent, IonTitle, IonToolbar, IonHeader, CommonModule, FormsModule, PlayButtomComponent, IonThumbnail],
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
    // private loadingController: LoadingController,
    // public toastController: ToastController,
    private router: Router,
    private musicPlayerService: MusicPlayerService
  ) {
    this.idAlbum = this.activatedRoute.snapshot.paramMap.get('idAlbum') || '';
  }

  async ngOnInit() {
    try {
      // await this.presentLoading();
      const response = await this.songSearchService.getAlbumInfo(this.idAlbum);
      console.log('response', response);
      this.dominantColor = await getDominantColorHex(response.urlImage);
      this.idAlbum = response.id;
      this.name = response.name;
      this.urlImage = response.urlImage;
      this.date = response.release_date;
      this.totalTracks = response.total_tracks;
      this.artists = response.artists;
      this.songs = response.songs;
      this.musicPlayerService.setPlaylist(this.songs);
      // await this.presentToastSuccess('bottom');
    } catch (error) {
      // await this.presentToastError('bottom', error);
      this.router.navigate(['/home']);
    } finally {
      // await this.dismissLoading();
    }
  }

  // async presentLoading() {
    // const loading = await this.loadingController.create({
      // translucent: false,
      // animated: true,
      // spinner: 'bubbles',
      // cssClass: 'custom-loader-songs',
    // });

    // return await loading.present();
  // }

  // async dismissLoading() {
    // return await this.loadingController.dismiss();
  // }

  // async presentToastSuccess(position: 'top' | 'middle' | 'bottom' = 'bottom') {
    // const toast = await this.toastController.create({
      // message: `Se obtuvo el artista ${this.name}!`,
      // duration: 1500,
      // position: position,
      // color: 'success',
    // });

    // await toast.present();
  // }

  // async presentToastError(
  //   position: 'top' | 'middle' | 'bottom' = 'bottom',
  //   error: any
  // ) {
  //   const toast = await this.toastController.create({
  //     message: 'Error al cargar el artista',
  //     duration: 1500,
  //     position: position,
  //     color: 'danger',
  //   });

  //   await toast.present();
  // }

  getGradientStyle(color: string): string {
    return `linear-gradient(to bottom, ${color} -40%, black 40%)`;
  }

  goToSong(idSong: string) {
    this.router.navigate(['/song', idSong]);
  }

  goToArtist(idArtist: string) {
    this.router.navigate(['/artist', idArtist]);
  }

  playAlbum() {
    this.musicPlayerService.play(this.songs[0].url_song);
  }
}


