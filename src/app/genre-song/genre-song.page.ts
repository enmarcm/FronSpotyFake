import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { SongSearchService } from '../services/song-search.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-genre-song',
  templateUrl: './genre-song.page.html',
  styleUrls: ['./genre-song.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class GenreSongPage implements OnInit, AfterViewInit {
  songSearchService = inject(SongSearchService);

  constructor(
    public loadingController: LoadingController,
    public toastController: ToastController,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.genre = this.activatedRoute.snapshot.paramMap.get('genre') || '';
  }

  private loader: any
  public genre: string = '';
  public songs: any = []
  private page: number = 1;

  ngAfterViewInit(): void {
    this.loader = document.getElementById('loader')
  }

  async ngOnInit() {
    try {
      await this.presentLoading();
      await this.obtainNewSongs();
      await this.setupIntersectionObserver();
      await this.presentToastSuccess('bottom');

    } catch (error) {
      await this.presentToastError('bottom', error);
      this.router.navigate(['/search']);
    } finally {
      await this.dismissLoading();
    }
  }

  async presentToastSuccess(position: 'top' | 'middle' | 'bottom' = 'bottom') {
    const toast = await this.toastController.create({
      message: `Cargaron las canciones`,
      duration: 500,
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
      message: `Error al cargar las canciones: ${error}`,
      duration: 500,
      position: position,
      color: 'danger',
      icon: 'close-circle-outline',
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

  async obtainNewSongs() {
    try {
      this.page += 1;
      const response = await this.songSearchService.getSongsByGenre(
        this.genre,
        this.page
      );

      this.songs = [...this.songs, ...response] as any;

    } catch (error) {
      await this.presentToastError('bottom', error);
    }
  }

  private async  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25,
    };

    const observer = new IntersectionObserver(async ([entry]) => {
      if (entry.isIntersecting) {
        await this.obtainNewSongs();
      }
    }, options);

    if (!this.loader) return;
    observer.observe(this.loader);
  }

  goToSong(songId: string){
    console.log(this.songs)
    console.log('songId', songId)
    this.router.navigate(['/song', songId]);
  }

}
