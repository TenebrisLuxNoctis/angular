import { Component, OnInit } from '@angular/core';
import { Criterion } from 'app/models/criterion';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { MatDialog } from '@angular/material';
import { CreateCriterionComponent } from 'app/components/create-criterion/create-criterion.component';
import { NotificationService, From, Align, Type } from 'app/services/notification/notification.service';

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
  public columnsToDisplay = ['Name', 'Description'];
  private criterion: Criterion;

  constructor(
    public dialog: MatDialog,
    public notif: NotificationService
  ) {
    this.criterions.push(new Criterion("Critère 1"));
    this.criterions.push(new Criterion("Critère 2"));
    this.criterions.push(new Criterion("Critère 3"));
    this.criterions.push(new Criterion("Critère 4"));
    this.criterions.push(new Criterion("Critère 5"));
    this.criterions.push(new Criterion("Critère 6"));
    this.criterions.push(new Criterion("Critère 7"));
    this.criterions.push(new Criterion("Critère 8"));

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
      if (result != undefined){
        this.criterion = result;
        this.notif.showNotification("Nous ne sommes pas en mesure d'effectuer cette action", From.Top, Align.Center, Type.Danger);
      }

      this.resetCriterion();
    });
  }

  private resetCriterion() {
    this.criterion = {
      Id: 0,
      Description: "",
      DisplayedString: "",
      Name: "",
      ResumeString: "",
      isExpanded: false
    };
  }
}
