import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { CriterionsComponent } from '../../criterions/criterions.component';
import { DocumentationComponent } from '../../documentation/documentation.component';
import { GamesComponent } from 'app/games/games.component';
import { GameViewComponent } from 'app/components/game-view/game-view.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'games', component: GamesComponent },
    { path: 'games/:id', component: GameViewComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'criterions', component: CriterionsComponent },
    { path: 'documentation', component: DocumentationComponent }
];