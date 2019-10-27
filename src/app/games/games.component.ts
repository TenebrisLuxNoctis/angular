import { Component, OnInit } from '@angular/core';
import { Game } from 'app/models/game';
import { MatDialog } from '@angular/material';
import { NotificationService, From, Align, Type } from 'app/services/notification/notification.service';
import { CreateGameComponent } from 'app/components/create-game/create-game.component';
import { DatabaseService } from 'app/services/database/database.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  public games: Game[] = [];
  private game: Game;
  private business: any;

  constructor(
    public dialog: MatDialog,
    private notif: NotificationService,
  ) {

    this.business = DatabaseService.getInstance();

    this.getGames();

    this.resetGame();
  }

  ngOnInit() {
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(CreateGameComponent, {
      // width: '250px',
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
      Id: 0,
      Title: "",
      ShortName: ""
    };
  }

  private getGames() {
    this.business.GameQuery.getGamesList(function (rows) {
      rows.array.forEach(row => {
        this.games.push(new Game(row.id));
      });
    });
  }
}
