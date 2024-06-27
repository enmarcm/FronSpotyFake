import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { URL_REQUEST } from 'src/constants';

@Injectable({
  providedIn: 'root',
})
export class SongSearchService {
  httpClient = inject(HttpClient);

  constructor() {}

  getSong(idSong: string): Promise<any> {
    return firstValueFrom(
      this.httpClient.get<any>(`${URL_REQUEST.GET_SONG}/${idSong}`)
    );
  }
}
