import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {IonicModule} from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [ IonicModule],
})
export class AppComponent {
  shouldRenderMenu: boolean;

  constructor(private router: Router) {
    this.shouldRenderMenu = !['/','/login', '/register'].includes(this.router.url);

    console.log('this.router.url', this.router.url)
  }
}
