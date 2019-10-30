import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Game } from 'app/models/game';
import { ApiService } from 'app/services/api/api.service';
import { Criterion } from 'app/models/criterion';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

  private criterions: Criterion[] = [];
  private action: string = "Créer";

  constructor(
    public dialogRef: MatDialogRef<CreateGameComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private api: ApiService
  ) {
    if (data.editMode)
      this.action = "Modifier";

    this.getCriterions();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  private async getCriterions() {
    this.criterions = await this.api.GET<Criterion[]>('/criterion/list');
  }

  public handleCriterion(id: number) {
    let index: number = this.data.game.criteres.indexOf(id);
    if (index == -1)
      this.data.game.criteres.push(id);
    else
      this.data.game.criteres.splice(index, 1);

    console.log(this.data.game.criteres);
  }

  public check(id: number) {
    return this.data.game.criteres.indexOf(id) > -1;
  }

}
