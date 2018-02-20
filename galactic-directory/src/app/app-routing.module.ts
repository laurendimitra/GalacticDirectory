import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleComponent }      from './people/people.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { PersonDetailComponent }  from './person-detail/person-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: PersonDetailComponent },
  { path: 'people', component: PeopleComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule { }
