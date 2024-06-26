import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'item-artist',
  templateUrl: './item-artist.component.html',
  standalone: true,
  imports: [IonicModule],
})
export class ItemArtistComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @Input() idArtist: string = ""
  @Input() artistName: string = 'artista';
  @Input() urlImage: string = 'https://via.placeholder.com/150';
}
