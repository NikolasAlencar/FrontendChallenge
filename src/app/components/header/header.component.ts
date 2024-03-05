import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, NgClass, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  activeButton = 'home';

  handleButton = (nameButton: string) => (this.activeButton = nameButton);

  isActiveButton = (nameButton: string) =>
    this.activeButton === nameButton ? 'white' : 'black';
}
