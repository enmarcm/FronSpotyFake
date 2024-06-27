import { Component, EnvironmentInjector, OnInit, inject } from '@angular/core';
import { addIcons } from 'ionicons';
import { home, search, folder } from 'ionicons/icons';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { MusicPlayerComponent } from '../music-player/music-player.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, MusicPlayerComponent],
})
export class TabsPage implements OnInit {
  public environmentInjector = inject(EnvironmentInjector);

  constructor(private router: Router) {
    addIcons({ home, search, folder });
  }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
      return;
    }
  }
}
