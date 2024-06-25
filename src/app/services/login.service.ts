import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  httpClient = inject(HttpClient);

  //Falta crear el tipo y la interfaz

  sendLoginRequest(username: string, password: string) {
    return firstValueFrom(
      this.httpClient.post('myrul', { username, password })
    );
  }
}
