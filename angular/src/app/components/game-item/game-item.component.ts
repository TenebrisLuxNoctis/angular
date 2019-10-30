import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Game } from 'app/models/game';
import { Router } from '@angular/router';
import { ApiService } from 'app/services/api/api.service';
import { NotificationService, From, Align, Type } from 'app/services/notification/notification.service';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss']
})
export class GameItemComponent implements OnInit {

  @Input() game: Game;
  @Output() deletion = new EventEmitter();
  @Output() edition = new EventEmitter();

  constructor(
    private router: Router,
    private api: ApiService,
    private notif: NotificationService
  ) { }

  ngOnInit() {
  }

  public View() {
    this.router.navigate(['games', 'view']);
  }

  public async deleteGame() {
    let response = await this.api.DELETE('/game/' + this.game.id);
    if (response.msg === "OK") {
      this.notif.showNotification("Le jeu a bien été supprimé", From.Top, Align.Center, Type.Success);
      this.deletion.emit(this.game.id);
    } else
      this.notif.showNotification("Une erreur est survenue lors de la suppression du jeu", From.Top, Align.Center, Type.Danger);
  }

  public async editGame(){
    this.game.criteres = await this.api.GET<number[]>('/game/'+this.game.id+'/criterions');
    this.edition.emit(this.game);
  }

}
