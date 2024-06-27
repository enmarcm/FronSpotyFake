import { IonicModule } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class ItemCardComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  @Input() songName: string = 'cancion';
  @Input() artistName: string[] = [];
  @Input() urlImage: string =
    'https://ionicframework.com/docs/img/demos/card-media.png';
  @Input() idSong: string = 'id';
  @Input() redirectTo?: string = '';

  public goToRoute() {
    this.router.navigate([`${this.redirectTo}/${this.idSong}`]);
  }
}
