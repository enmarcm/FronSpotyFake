import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { URL_REQUEST } from 'src/constants';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  httpClient = inject(HttpClient);

  //Falta crear el tipo y la interfaz

  sendLoginRequest(userName: string, password: string) {
    return firstValueFrom(
      this.httpClient.post(URL_REQUEST.LOGIN, { userName, password })
    );
  }

  sendRegisterRequest(register: RegisterData) {
    const { userName, password, email, dateOfBirth } = register;

    return firstValueFrom(
      this.httpClient.post(URL_REQUEST.REGISTER, {
        userName,
        password,
        email,
        dateOfBirth,
      })
    );
  }
}

interface RegisterData {
  userName: string;
  password: string;
  email: string;
  dateOfBirth: string;
}
