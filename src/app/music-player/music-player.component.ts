import { Component, OnInit} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { play, pause } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { MusicPlayerService } from '../services/music-player.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
  imports: [IonicModule, CommonModule],
  standalone: true,
})
export class MusicPlayerComponent  implements OnInit {
  isPlaying: boolean = false;
  duration: number = 0;
  currentTime: number = 0;
  progress: number = 0;

  constructor(private musicPlayerService: MusicPlayerService) { 
    addIcons({ play, pause });
  }

  ngOnInit() {
    this.musicPlayerService.playStatus$.subscribe(status => {
      this.isPlaying = status;
    });

    this.musicPlayerService.currentTime$.subscribe(currentTime => {
      this.currentTime = currentTime;
      this.progress = (this.currentTime / this.duration) * 100;
      // console.log(this.duration)
    })
  }
  
  play() {
    const url = 'https://p.scdn.co/mp3-preview/b9b7e4c982b33ee23c4867f7a3025e3598c35760?cid=cfe923b2d660439caf2b557b21f31221'; // This should come from your track list
    this.musicPlayerService.play(url);
  }

  pause() {
    this.musicPlayerService.pause();
  }


}
