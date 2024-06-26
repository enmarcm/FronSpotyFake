import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { play, pause } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { JoinArtistsPipe } from '../services/joinArtists';
import { MusicPlayerService } from '../services/music-player.service';
import { CommonModule } from '@angular/common';
import { PlayButtomComponent } from '../play-buttom/play-buttom.component';
import { SharedDataService } from '../services/shared-data.service';
import { FormsModule } from '@angular/forms';

interface ArtistInterface {
  id: string;
  name: string;
  followers: number;
  gneres: string[];
  urlImage: string;
}

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
  imports: [
    IonicModule,
    CommonModule,
    PlayButtomComponent,
    JoinArtistsPipe,
    FormsModule,
  ],
  standalone: true,
})
export class MusicPlayerComponent implements OnInit {
  songUrl: string = '';
  isPlaying: boolean = false;
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
  public currentAudioPosition = 0;

  constructor(
    private musicPlayerService: MusicPlayerService,
    private sharedDataService: SharedDataService
  ) {
    addIcons({ play, pause });
  }

  isShow() {
    return (
      this.songUrl != null && this.songUrl != '' && this.songUrl != undefined
    );
  }

  ngOnInit() {
    this.musicPlayerService.songUrl$.subscribe((url) => {
      if (!url || url === null) return;

      this.songUrl = url;
    });
    this.musicPlayerService.playStatus$.subscribe((status) => {
      this.isPlaying = status;
    });
    this.sharedDataService.currentUrlSong.subscribe(
      (url) => (this.urlSong = url)
    );
    this.sharedDataService.currentArtists.subscribe(
      (artists) => (this.artists = artists)
    );
    this.sharedDataService.currentSongName.subscribe(
      (name) => (this.name = name)
    );
    this.sharedDataService.currentTrackPhoto.subscribe(
      (photo) => (this.urlImage = photo)
    );
  }

  togglePlayPause() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying && this.urlSong) {
      this.musicPlayerService.resume();
    } else {
      this.musicPlayerService.pause(); // Pause the song
    }
  }

  pause() {
    this.musicPlayerService.pause();
  }

  changeCurrentTime(event: any) {
    this.currentAudioPosition = event.detail.value;
    this.musicPlayerService.changeCurrentTime(this.currentAudioPosition);
  }
}
