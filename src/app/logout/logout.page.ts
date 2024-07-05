import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonGrid, IonCol, IonRow } from "@ionic/angular/standalone";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  standalone: true,
  imports: [IonRow, IonCol, IonGrid, IonContent,  CommonModule, FormsModule, RouterLink],
})
export class LogoutPage implements OnInit {
  constructor(private router: Router) {}

  public seconds: number = 10;

  ngOnInit() {
    localStorage.removeItem('token');

    const intervalId = setInterval(() => {
      if (this.seconds === 0) {
        clearInterval(intervalId);
        this.router.navigate(['/main']);
        return;
      }
      this.seconds--;
    }, 1000);
  }
}
