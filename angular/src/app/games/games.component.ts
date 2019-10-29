import { Component, OnInit } from '@angular/core';
import { Game } from 'app/models/game';
import { MatDialog } from '@angular/material';
import { NotificationService, From, Align, Type } from 'app/services/notification/notification.service';
import { CreateGameComponent } from 'app/components/create-game/create-game.component';
import { ApiService } from 'app/services/api/api.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  public games: Game[] = [];
  private game: Game;

  constructor(
    public dialog: MatDialog,
    private notif: NotificationService,
    private api: ApiService
  ) {
    this.getGames();
    this.resetGame();
  }

  ngOnInit() {
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(CreateGameComponent, {
      data: this.game
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.game = result;
        this.notif.showNotification("Nous ne sommes pas en mesure d'effectuer cette action", From.Top, Align.Center, Type.Danger);
      }

      this.resetGame();
    });
  }

  private resetGame() {
    this.game = {
      id: 0,
      title: "",
      shortName: ""
    };
  }

  private async getGames() {
   this.games = await this.api.GET<Game[]>('/game/list');
  }
}
