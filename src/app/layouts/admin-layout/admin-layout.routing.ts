import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { CriteresComponent } from '../../criteres/criteres.component';
import { DocumentationComponent } from '../../documentation/documentation.component';
import { IconsComponent } from '../../icons/icons.component';
import { GamesComponent } from 'app/games/games.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'games', component: GamesComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'criterions', component: CriteresComponent },
    { path: 'documentation', component: DocumentationComponent },
    { path: 'icons', component: IconsComponent },
];