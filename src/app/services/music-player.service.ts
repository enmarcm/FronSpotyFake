import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class MusicPlayerService {
  private audio = new Audio();
  private isPlaying = false;
  private playStatus = new BehaviorSubject<boolean>(this.isPlaying);
  public playStatus$ = this.playStatus.asObservable();
  private currentTimeSource = new BehaviorSubject<number>(0);
  currentTime$ = this.currentTimeSource.asObservable();
  private durationSource = new BehaviorSubject<number>(0);
  duration$ = this.durationSource.asObservable();
  private songUrlSource = new BehaviorSubject<string | null>(null);
  public songUrl$ = this.songUrlSource.asObservable();

  constructor(private loadingController: LoadingController) {}

  async play(url: string) {
    this.songUrlSource.next(url);

    if (this.audio.src === url) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  
    this.audio.src = url;
    await this.presentLoading();
    try {
      await this.loadAudio(); 
      await this.dismissLoading();
      await this.startPlayback(); // Inicia la reproducción
    } catch (error) {
      console.error("Error during audio playback:", error);
      await this.dismissLoading();
    }
  }

  private async loadAudio() {
    return new Promise((resolve, reject) => {
      this.audio.load();
      this.audio.onloadedmetadata = () => {
        this.durationSource.next(this.audio.duration);
        resolve(true);
      };
      this.audio.onerror = reject;
      this.audio.ontimeupdate = () => {
        this.currentTimeSource.next(this.audio.currentTime);
      };
    });
  }

  private async startPlayback() {
    try {
      await this.audio.play();
      this.isPlaying = true;
      this.playStatus.next(this.isPlaying);
    } catch (error) {
      throw error;
    }
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    this.playStatus.next(this.isPlaying);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      translucent: false,
      animated: true,
      spinner: 'lines-sharp',
      cssClass: 'custom-loader-songs',
    });

    return await loading.present();
  }

  async dismissLoading() {
    return await this.loadingController.dismiss();
  }

  resume() {
    if (!this.isPlaying && this.audio.src) {
      this.audio.play();
      this.isPlaying = true;
      this.playStatus.next(this.isPlaying);
    }
  }

  changeCurrentTime(time: number) {
    this.audio.currentTime = time;
  }
}