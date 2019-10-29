import { Component, OnInit } from '@angular/core';
import { Criterion } from 'app/models/criterion';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { MatDialog } from '@angular/material';
import { CreateCriterionComponent } from 'app/components/create-criterion/create-criterion.component';
import { NotificationService, From, Align, Type } from 'app/services/notification/notification.service';
import { ApiService } from 'app/services/api/api.service';

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
  private criterion: Criterion;

  constructor(
    public dialog: MatDialog,
    private notif: NotificationService,
    private api: ApiService
  ) {
    this.getCriterions();

    this.resetCriterion();
  }

  ngOnInit() {
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(CreateCriterionComponent, {
      // width: '250px',
      data: this.criterion
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.criterion = result;
        this.notif.showNotification("Nous ne sommes pas en mesure d'effectuer cette action", From.Top, Align.Center, Type.Danger);
      }

      this.resetCriterion();
    });
  }

  private resetCriterion() {
    this.criterion = {
      id: 0,
      description: "",
      displayedString: "",
      name: "",
      resumeString: "",
      isExpanded: false
    };
  }

  private async getCriterions() {
    this.criterions = await this.api.GET<Criterion[]>('/criterion/list');
  }
}
