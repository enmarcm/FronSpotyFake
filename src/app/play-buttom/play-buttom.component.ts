import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MusicPlayerService } from '../services/music-player.service';

@Component({
  selector: 'play-buttom',
  templateUrl: './play-buttom.component.html',
  styleUrls: ['./play-buttom.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class PlayButtomComponent implements OnInit {
  @Input() songUrl: string | undefined; // Define an input property to receive the song URL
  constructor(private MusicPlayerService: MusicPlayerService) {}

  ngOnInit() {}

  isPlaying = false;

  togglePlayPause() { // Accept songUrl as an argument
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying && this.songUrl) { // Check if songUrl is defined
      this.MusicPlayerService.play(this.songUrl); // Play the song using the provided URL
    } else {
      this.MusicPlayerService.pause(); // Pause the song
    }
  }
}
