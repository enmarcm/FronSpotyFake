import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink],
})
export class MainPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/tabs']);
      return;
    }
  }
}
