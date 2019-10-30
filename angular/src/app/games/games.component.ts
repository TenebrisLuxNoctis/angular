import { Component, OnInit } from '@angular/core';
import { Game } from 'app/models/game';
import { MatDialog } from '@angular/material';
import { NotificationService, From, Align, Type } from 'app/services/notification/notification.service';
import { CreateGameComponent } from 'app/components/create-game/create-game.component';
import { ApiService } from 'app/services/api/api.service';
import { Message } from 'app/models/message';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  public games: Game[] = [];
  private game: Game = new Game();
  private edit: boolean = false;

  constructor(
    public dialog: MatDialog,
    private notif: NotificationService,
    private api: ApiService
  ) {
    this.getGames();
  }

  ngOnInit() {
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(CreateGameComponent, {
      data: { game: this.game, editMode: this.edit }
    });

    dialogRef.afterClosed().subscribe(async result => {

      //Si une action en base est requise
      if (result != undefined) {

        if (this.game.criteres.length > 0) {
          let url: string = '/game';
          let action: string = "créé";

          //Si l'on est dans le cas d'une modification
          if (this.edit) {
            url += '/' + this.game.id;
            action = "modifié";
          }

          this.game = result;
          let msg: Message = await this.api.POST(url, this.game);
          if (msg.msg === "OK") {
            this.notif.showNotification("Le jeu a bien été " + action, From.Top, Align.Center, Type.Success);
            if (!this.edit)
              this.games.push(this.game);
            else {
              this.games.forEach(function(elt, index){
                if(elt.id == this.game.id)
                  this.games[index] = this.game;
              });
            }
          }
          else
            this.notif.showNotification("Une erreur est survenue, réessayez ultérieurement !", From.Top, Align.Center, Type.Danger);
        }
        else
          this.notif.showNotification("Erreur, aucun critère n'a été saisi !", From.Top, Align.Center, Type.Danger);
      }

      this.game = new Game();
      this.edit = false;
    });
  }

  private async getGames() {
    this.games = await this.api.GET<Game[]>('/game/list');
  }

  public OnDelete(id: number) {
    this.games = this.games.filter(function (elt) {
      return elt.id != id;
    });
  }

  public OnEdit(game: Game) {
    this.game = game;
    this.edit = true;
    this.openDialog();
  }
}
