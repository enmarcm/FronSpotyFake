import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SongSearchService } from '../services/song-search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class SearchPage implements OnInit {
  songSearchService = inject(SongSearchService);
  public genres = Array<string>();

  constructor(
    public loadingController: LoadingController,
    public toastController: ToastController,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      const response = await this.songSearchService.getGenres();
      this.genres = response;
    } catch (error) {
      console.error(error);
    }
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    console.log(query);
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

  async presentToastError(
    position: 'top' | 'middle' | 'bottom' = 'bottom',
    error: any
  ) {
    const toast = await this.toastController.create({
      message: 'Error al cargar la canción',
      duration: 1500,
      position: position,
      color: 'danger',
      icon: 'close-circle-outline',
    });

    await toast.present();
  }

  async dismissLoading() {
    return await this.loadingController.dismiss();
  }
}
