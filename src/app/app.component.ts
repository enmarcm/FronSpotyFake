import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Subscription, filter } from 'rxjs';
import { NavbarComponent } from './navbar/navbar.component';
import { MusicPlayerComponent } from './music-player/music-player.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonicModule, NavbarComponent, MusicPlayerComponent],
})
export class AppComponent implements OnInit, OnDestroy {
  shouldRenderMenu: boolean;
  selectedSongUrl: string= "";
  private routerSubscription: Subscription = new Subscription();

  constructor(private router: Router) {
    this.shouldRenderMenu = ![
      '/',
      '/auth/login',
      '/auth/register',
      '/logout',
      '/main',
    ].includes(this.router.url);
  }

  ngOnInit() {
    this.updateMenuVisibility();
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateMenuVisibility();
      });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  selectSong(url: string) {
    this.selectedSongUrl = url;
    // You might also want to ensure shouldRenderMenu is true here
  }

  private updateMenuVisibility() {
    this.shouldRenderMenu = ![
      '/',
      '/auth/login',
      '/auth/register',
      '/logout',
      '/main',
    ].includes(this.router.url);
    console.log(this.router.url, this.shouldRenderMenu);
  }

}
