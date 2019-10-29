import { Component, OnInit } from '@angular/core';
import { Criterion } from 'app/models/criterion';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { MatDialog } from '@angular/material';
import { CreateCriterionComponent } from 'app/components/create-criterion/create-criterion.component';
import { NotificationService, From, Align, Type } from 'app/services/notification/notification.service';
import { ApiService } from 'app/services/api/api.service';
import { Message } from 'app/models/message';

@Component({
  selector: 'app-criterions',
  templateUrl: './criterions.component.html',
  styleUrls: ['./criterions.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class CriterionsComponent implements OnInit {

  public criterions: Criterion[] = [];
  public columnsToDisplay = ['name', 'description'];
  private criterion: Criterion = new Criterion("");

  constructor(
    public dialog: MatDialog,
    private notif: NotificationService,
    private api: ApiService
  ) {
    this.getCriterions();
  }

  ngOnInit() {
  }

  public async openDialog() {
    const dialogRef = this.dialog.open(CreateCriterionComponent, {
      // width: '250px',
      data: this.criterion
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result != undefined) {

        this.criterion = result;
        let msg: Message = await this.api.POST('/criterion', this.criterion);
        if (msg.msg === "OK") {
          this.notif.showNotification("Le critère a bien été créé", From.Top, Align.Center, Type.Success);
          this.criterions = this.criterions.concat([this.criterion]);
        }
        else
          this.notif.showNotification("Une erreur est survenue lors de la création !", From.Top, Align.Center, Type.Danger);
      }

      this.criterion = new Criterion("");
    });
  }

  private async getCriterions() {
    this.criterions = await this.api.GET<Criterion[]>('/criterion/list');
  }

  public OnItemDelete(id: number) {
    this.criterions = this.criterions.filter(function (elt) { return elt.id != id })
  }
}
