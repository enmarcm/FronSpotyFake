import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import songsMocks from "../../mocks/music.json"
import { ItemCardComponent } from '../item-card/item-card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, IonicModule, ItemCardComponent]
})
export class HomePage implements OnInit {

  constructor() { }

  public songs: any[] = songsMocks

  ngOnInit() {

  }

}
