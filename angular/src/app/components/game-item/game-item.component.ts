import { Component, OnInit, Input } from '@angular/core';
import { Game } from 'app/models/game';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss']
})
export class GameItemComponent implements OnInit {

  @Input() game: Game;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public View(){
    this.router.navigate(['games', 'view']); 
  }

}
