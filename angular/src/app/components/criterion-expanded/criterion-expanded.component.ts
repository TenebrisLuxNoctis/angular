import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Criterion } from 'app/models/criterion';
import { NotificationService, From, Align, Type } from 'app/services/notification/notification.service';
import { ApiService } from 'app/services/api/api.service';

@Component({
  selector: 'app-criterion-expanded',
  templateUrl: './criterion-expanded.component.html',
  styleUrls: ['./criterion-expanded.component.scss']
})
export class CriterionExpandedComponent implements OnInit {

  @Input() criterion: Criterion;
  @Output() deletion = new EventEmitter();

  constructor(
    private notif: NotificationService,
    private api: ApiService
  ) {

  }

  public async delete() {
    let response = await this.api.DELETE('/criterion/' + this.criterion.id);
    if (response.msg === "OK") {
      this.notif.showNotification("Le critère a bien été supprimé", From.Top, Align.Center, Type.Success);
      this.deletion.emit(this.criterion.id);
    } else
      this.notif.showNotification("Une erreur est survenue lors de la suppression du critère", From.Top, Align.Center, Type.Danger);
  }

  public async update() {
    let response = await this.api.POST('/criterion/' + this.criterion.id, this.criterion);
    if (response.msg === "OK") {
      this.notif.showNotification("Le critère a été modifié !", From.Top, Align.Center, Type.Success);
      this.criterion.isExpanded = false;
    }
    else
      this.notif.showNotification("Une erreur est survenue lors de la modification", From.Top, Align.Center, Type.Danger);
  }

  ngOnInit() {
  }

}
