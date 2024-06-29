import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../home/home.page').then((m) => m.HomePage),
      },

      {
        path: 'home/song/:idSong',
        loadComponent: () =>
          import('.././song/song.page').then((m) => m.SongPage),
      },
      {
        path: 'home/artist/:idArtist',
        loadComponent: () =>
          import('.././artist/artist.page').then((m) => m.ArtistPage),
      },
      {
        path: 'home/album/:idAlbum',
        loadComponent: () =>
          import('.././album/album.page').then((m) => m.AlbumPage),
      },

      {
        path: 'search',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'folder',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];
