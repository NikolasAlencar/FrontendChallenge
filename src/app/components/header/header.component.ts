import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { CharactersService } from '../../services/characters.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, NgClass, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private router: Router,
    public characterService: CharactersService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const rotaAtual = this.router.url.substring(1);
        if (rotaAtual === 'home') {
          this.isActiveButton(rotaAtual);
          this.handleButton(rotaAtual);
        }
      }
    });
  }

  activeButton = 'home';

  handleButton = (nameButton: string) => (this.activeButton = nameButton);

  isActiveButton = (nameButton: string) =>
    this.activeButton === nameButton ? 'white' : 'black';
}
