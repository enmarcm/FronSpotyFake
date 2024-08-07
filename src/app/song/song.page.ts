import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SongSearchService } from '../services/song-search.service';
import getDominantColorHex from 'src/utils/getColorFromUrl';
// import { LoadingController, ToastController } from '@ionic/angular';
import { PlayButtomComponent } from '../play-buttom/play-buttom.component';
import { SharedDataService } from '../services/shared-data.service';
import { IonHeader, IonContent, IonTitle, IonToolbar, IonRow, IonGrid, IonCol, IonImg, IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader } from "@ionic/angular/standalone";

interface ArtistInterface {
  id: string;
  name: string;
  followers: number;
  gneres: string[];
  urlImage: string;
}

@Component({
  selector: 'app-song',
  templateUrl: './song.page.html',
  styleUrls: ['./song.page.scss'],
  standalone: true,
  imports: [IonCardHeader, IonCardSubtitle, IonCardTitle, IonCard, IonImg, IonCol, IonGrid, IonRow, IonToolbar, IonTitle, IonContent, IonHeader,  CommonModule, FormsModule, PlayButtomComponent],
})
export class SongPage implements OnInit {
  songSearchService = inject(SongSearchService);

  public idSong: string = '';
  public name: string = '';
  public duration: number = 0;
  public artists: Array<ArtistInterface> = [];
  public album: {
    name: string;
    urlImage: string;
    id: string;
  } = {} as any;
  public date: string = '';
  public urlImage: string = '';
  public urlSong: string = '';
  public dominantColor: string = '';
  public formattedDuration = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    // public loadingController: LoadingController,
    // public toastController: ToastController,
    private router: Router,
    private sharedDataService: SharedDataService
  ) {
    this.idSong = this.activatedRoute.snapshot.paramMap.get('idSong') || '';
  }

  async ngOnInit() {
    try {
      // await this.presentLoading();
      const response = await this.songSearchService.getSong(this.idSong);

      this.dominantColor = await getDominantColorHex(response.album.urlImage);
      this.idSong = response.id;
      this.name = response.name;
      this.artists = response.artists;
      this.album = response.album;
      this.date = response.date;
      this.urlImage = response.urlImage;
      this.urlSong = response.url_song;
  
      this.duration = Number(response.duration_ms);

      const minutes = Math.floor(this.duration / 60000);
      const seconds = Math.floor((this.duration % 60000) / 1000);

      this.formattedDuration = `${minutes}:${
        seconds < 10 ? '0' : ''
      }${seconds}`;
    } catch (error) {
      console.error(error);
      this.router.navigate(['/tabs']);
    } finally {
      // this.dismissLoading();
    }
  }

  goToArtist(idArtist: string) {
    this.router.navigate([`/artist/${idArtist}`]);
  }

  updateSharedData() {
    this.sharedDataService.changeUrlSong(this.urlSong);
    this.sharedDataService.changeArtists(this.artists);
    this.sharedDataService.changeSongName(this.name);
    this.sharedDataService.changeTrackPhoto(this.urlImage);
  }

  getGradientStyle(color: string): string {
    return `linear-gradient(to bottom, ${color} -40%, black 40%)`;
  }

  // async presentLoading() {
  //   const loading = await this.loadingController.create({
  //     translucent: false,
  //     animated: true,
  //     spinner: 'bubbles',
  //     cssClass: 'custom-loader-songs',
  //   });

  //   return await loading.present();
  // }

  // async dismissLoading() {
  //   return await this.loadingController.dismiss();
  // }

  // async presentToastSuccess(position: 'top' | 'middle' | 'bottom' = 'bottom') {
  //   const toast = await this.toastController.create({
  //     message: `Se obtuvo la canción ${this.name}!`,
  //     duration: 1500,
  //     position: position,
  //     color: 'success',
  //   });

  //   await toast.present();
  // }

  // async presentToastError(
  //   position: 'top' | 'middle' | 'bottom' = 'bottom',
  //   error: any
  // ) {
  //   const toast = await this.toastController.create({
  //     message: 'Error al cargar la canción',
  //     duration: 1500,
  //     position: position,
  //     color: 'danger',
  //   });

  //   await toast.present();
  // }

  imageSize = 200;

  onScroll(event: any) {
    const scrollTop = event.detail.scrollTop;
    this.imageSize = Math.max(100, 200 - scrollTop / 5);
  }
}
