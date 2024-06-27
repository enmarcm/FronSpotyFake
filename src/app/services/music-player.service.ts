// music-player.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
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
  
    constructor() {}
  
    play(url: string) {
      if (!this.isPlaying) {
        if (this.audio.src !== url) { // If a new track, set the source
          this.audio.src = url;
          this.audio.load();
          this.audio.onloadedmetadata = () => {
              this.durationSource.next(this.audio.duration);
              console.log(this.audio.duration)
            };

            this.audio.ontimeupdate = () => {
                this.currentTimeSource.next(this.audio.currentTime);
              };
        }
      
        this.audio.play().then(() => {
          this.isPlaying = true;
          this.playStatus.next(this.isPlaying);
        }).catch(error => console.error("Error playing audio:", error));
      } else {
        this.pause();
      }
    }
  
    pause() {
      this.audio.pause();
      this.isPlaying = false;
      this.playStatus.next(this.isPlaying);
    }
  
    // Optionally, if you need a method to directly resume the audio
    resume() {
      if (!this.isPlaying && this.audio.src) {
        this.audio.play().then(() => {
          this.isPlaying = true;
          this.playStatus.next(this.isPlaying);
        }).catch(error => console.error("Error resuming audio:", error));
      }
    }

  }