import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'play-buttom',
  templateUrl: './play-buttom.component.html',
  styleUrls: ['./play-buttom.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class PlayButtomComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  isPlaying = false;

  togglePlayPause() {
    this.isPlaying = !this.isPlaying;
  }
}
