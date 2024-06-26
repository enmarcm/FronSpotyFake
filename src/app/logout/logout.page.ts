import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class LogoutPage implements OnInit {
  constructor(private router: Router) {}

  public seconds: number = 1000;

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
