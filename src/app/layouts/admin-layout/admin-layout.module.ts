import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { CriterionsComponent } from '../../criterions/criterions.component';
import { DocumentationComponent } from '../../documentation/documentation.component';
import { GamesComponent } from 'app/games/games.component';
import { GameItemComponent } from 'app/components/game-item/game-item.component';
import { CriterionExpandedComponent } from 'app/components/criterion-expanded/criterion-expanded.component';
import { CreateCriterionComponent } from 'app/components/create-criterion/create-criterion.component';
import { CreateGameComponent } from 'app/components/create-game/create-game.component';
import { GameViewComponent } from 'app/components/game-view/game-view.component';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatCardModule,
  MatTableModule,
  MatListModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatCardModule,
    MatListModule,
    MatDialogModule
  ],
  entryComponents: [
    CreateCriterionComponent,
    CreateGameComponent
  ],
  declarations: [
    GamesComponent,
    GameItemComponent,
    GameViewComponent,
    CreateGameComponent,
    DashboardComponent,
    CriterionsComponent,
    CriterionExpandedComponent,
    CreateCriterionComponent,
    DocumentationComponent
  ]
})

export class AdminLayoutModule {}