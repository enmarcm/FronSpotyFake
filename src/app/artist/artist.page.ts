import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { SongSearchService } from '../services/song-search.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.page.html',
  styleUrls: ['./artist.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ArtistPage implements OnInit {
  songSearchService = inject(SongSearchService);

  constructor(
    private activatedRoute: ActivatedRoute,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private router: Router
  ) {
    this.idArtist = this.activatedRoute.snapshot.paramMap.get('idArtist') || '';
  }

  idArtist: string = '';
  @Input() name = '';
  @Input() genres = [];
  @Input() urlImage = '';
  @Input() songs: songType[] = [
    {
      urlImage: '',
      name: '',
      id: '',
    },
  ];
  @Input() albums: albumType[] = [
    {
      urlImage: '',
      name: '',
      id: '',
    },
  ];

  @Input() followers: number = 0;

  async ngOnInit() {
    try {
      await this.presentLoading();

      const response = await this.songSearchService.getArtistInfo(
        this.idArtist
      );

      this.name = response.name;
      this.followers = response.followers.total;
      this.genres = response.genres;
      this.urlImage = response.images[0].url;
      this.idArtist = response.id;

      const response2 = await this.songSearchService.getArtistAlbums(
        this.idArtist
      );

      this.albums = response2;

      const tracksForOneAlbum = response2[0].songs.map((song: any) => {
        const newObject = {
          urlImage: response2[0].urlImage,
          id: song.id,
          name: song.name,
          date: song.release_date || Date.now(),
        };

        return newObject;
      });

      this.songs = tracksForOneAlbum;

      await this.presentToastSuccess('bottom');
    } catch (error) {
      await this.presentToastError('bottom', error);
      this.router.navigate(['/tabs']);
    } finally {
      await this.dismissLoading();
    }
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

  goToSong(idSong: string) {
    this.router.navigate(['/song', idSong]);
  }

  goToAlbum(idAlbum: string) {
    this.router.navigate(['/album', idAlbum]);
  
  }
}

interface songType {
  urlImage: string;
  name: string;
  id: string;
}

interface albumType {
  urlImage: string;
  name: string;
  id: string;
}
