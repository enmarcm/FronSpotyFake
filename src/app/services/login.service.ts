import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { URL_REQUEST } from 'src/constants';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public httpClient = inject(HttpClient);

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

  obtainDataUser() {
    const token = localStorage.getItem('token');
    return firstValueFrom(
      this.httpClient.get(URL_REQUEST.OBTAIN_DATA_USER, {
        headers: {
          Authorization: `${token}`,
        },
      })
    );
  }

  updateDataUser(data: RegisterData) {
    const token = localStorage.getItem('token');
    return firstValueFrom(
      this.httpClient.put(URL_REQUEST.UPDATE_DATA_USER, data, {
        headers: {
          Authorization: `${token}`,
        },
      })
    );
  }

  deleteAccount() {
    const token = localStorage.getItem('token');
    return firstValueFrom(
      this.httpClient.delete(URL_REQUEST.DELETE_USER, {
        headers: {
          Authorization: `${token}`,
        },
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
