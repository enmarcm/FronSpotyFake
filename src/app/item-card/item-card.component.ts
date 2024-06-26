import { IonicModule } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class ItemCardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @Input() songName: string = 'cancion';
  @Input() artistName: string[] = ['artista'];
  @Input() urlImage: string =
    'https://ionicframework.com/docs/img/demos/card-media.png';
  @Input() idSong: string = 'id';
}
