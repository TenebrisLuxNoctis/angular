import { Component, OnInit } from '@angular/core';
import { Game } from 'app/models/game';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  public games: Game[] = [];

  constructor() { 

    this.games.push(new Game("Titre 1"));
    this.games.push(new Game("Titre 2"));
    this.games.push(new Game("Titre 3"));
    this.games.push(new Game("Titre 4"));
    this.games.push(new Game("Titre 5"));
  }

  ngOnInit() {
  }

}
