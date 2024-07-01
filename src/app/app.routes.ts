import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'main',
    loadComponent: () => import('./main/main.page').then((m) => m.MainPage),
  },
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full',
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'logout',
    loadComponent: () =>
      import('./logout/logout.page').then((m) => m.LogoutPage),
  },
  {
    path: 'song/:idSong',
    redirectTo: '/tabs/home/song/:idSong',
  },
  {
    path: 'artist/:idArtist',
    redirectTo: '/tabs/home/artist/:idArtist',
  },
  {
    path: 'album/:idAlbum',
    redirectTo: '/tabs/home/album/:idAlbum',
  },
  {
    path: 'search',
    redirectTo: '/tabs/search',
  },
  {
    path: 'songGenre/:genre',
    redirectTo: '/tabs/search/songGenre/:genre',
  },
  {
    path: 'searchSong/:name',
    redirectTo: '/tabs/search/searchSong/:name',
  },
  
];
