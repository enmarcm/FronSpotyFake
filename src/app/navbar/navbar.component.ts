import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports : [IonicModule, RouterLink],
  standalone: true
})
export class NavbarComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
