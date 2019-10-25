import { Component, OnInit } from '@angular/core';
import { Criterion } from 'app/models/criterion';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-criteres',
  templateUrl: './criteres.component.html',
  styleUrls: ['./criteres.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class CriteresComponent implements OnInit {

  public criterions : Criterion[] = [];
  public columnsToDisplay = ['Name', 'Description'];

  constructor() { 
    this.criterions.push(new Criterion("Critère 1"));
    this.criterions.push(new Criterion("Critère 2"));
    this.criterions.push(new Criterion("Critère 3"));
    this.criterions.push(new Criterion("Critère 4"));
    this.criterions.push(new Criterion("Critère 5"));
    this.criterions.push(new Criterion("Critère 6"));
    this.criterions.push(new Criterion("Critère 7"));
    this.criterions.push(new Criterion("Critère 8"));
  }

  ngOnInit() {
  }

}
