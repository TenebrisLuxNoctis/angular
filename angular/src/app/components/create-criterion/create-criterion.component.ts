import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Criterion } from 'app/models/criterion';

@Component({
  selector: 'app-create-criterion',
  templateUrl: './create-criterion.component.html',
  styleUrls: ['./create-criterion.component.scss']
})
export class CreateCriterionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateCriterionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Criterion
    ) {

    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
