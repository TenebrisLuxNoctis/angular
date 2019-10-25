import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { CriteresComponent } from '../../criteres/criteres.component';
import { DocumentationComponent } from '../../documentation/documentation.component';
import { IconsComponent } from '../../icons/icons.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatCardModule,
  MatTableModule,
  MatListModule
} from '@angular/material';
import { GamesComponent } from 'app/games/games.component';
import { GameItemComponent } from 'app/components/game-item/game-item.component';
import { CriterionExpandedComponent } from 'app/components/criterion-expanded/criterion-expanded.component';
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
    MatListModule
  ],
  declarations: [
    GamesComponent,
    GameItemComponent,
    DashboardComponent,
    CriteresComponent,
    CriterionExpandedComponent,
    DocumentationComponent,
    IconsComponent
  ]
})

export class AdminLayoutModule {}