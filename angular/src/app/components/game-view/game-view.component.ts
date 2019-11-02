import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/services/api/api.service';
import { Stats } from 'app/models/stats';
import { Message } from 'app/models/message';
import { NotificationService, From, Align, Type } from 'app/services/notification/notification.service';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss']
})
export class GameViewComponent implements OnInit {

  public status : boolean;
  public statusText;
  public finished = "Terminé";
  public unfinished = "Non terminé";

  public game: Stats = new Stats();
  public img: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private notif: NotificationService
  ) {
    let id: number = parseInt(this.route.snapshot.paramMap.get('id'));
    this.getGame(id);
  }

  ngOnInit() {
  }

  private async getGame(id: number) {
    this.game = await this.api.GET('/game/' + id);
    this.img = (this.game.title).replace(/ /g, "%20");
    this.status = this.game.ended;
    this.statusText = this.status ? this.finished : this.unfinished;
  }

  public redirectToList(){
    this.router.navigate(["/games"]);
  }

  public async changeStatus(){
    let msg: Message = await this.api.POST('/game/'+this.game.id+'/status', {status :!this.game.ended});
    if(msg.msg ==="OK"){
      this.game.ended = !this.game.ended;
      this.status = this.game.ended;
      this.statusText = this.status ? this.finished : this.unfinished;

      this.notif.showNotification("Le statut a bien été mis à jour", From.Top, Align.Center, Type.Success);
    }
    else{
      this.status = this.game.ended;
      this.notif.showNotification("Une erreur est survenue lors de la mise à jour !", From.Top, Align.Center, Type.Danger);
    }
  }
}
