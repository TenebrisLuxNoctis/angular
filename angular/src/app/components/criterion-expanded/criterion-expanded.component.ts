import { Component, OnInit, Input } from '@angular/core';
import { Criterion } from 'app/models/criterion';
import { NotificationService, From, Align, Type } from 'app/services/notification/notification.service';

@Component({
  selector: 'app-criterion-expanded',
  templateUrl: './criterion-expanded.component.html',
  styleUrls: ['./criterion-expanded.component.scss']
})
export class CriterionExpandedComponent implements OnInit {

  @Input() criterion: Criterion;

  constructor(private notif:NotificationService) { 

  }

  public delete(){
    this.notif.showNotification("Votre action de suppression ne peut aboutir", From.Top, Align.Center, Type.Danger)
  }

  public update(){
    this.notif.showNotification("Votre action de modification ne peut aboutir", From.Top, Align.Center, Type.Danger)
  }

  ngOnInit() {
  }

}
