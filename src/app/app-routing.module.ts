import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssigntableComponent } from './components/assigntable.component';
import { CheckinComponent } from './components/checkin.component';
import { HomeComponent } from './components/home.component';
import { RsvpComponent } from './components/rsvp.component';
import { SeeYouComponent } from './components/see-you.component';
import { TableComponent } from './components/table.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'rsvp/:token', component: RsvpComponent},
  {path:'complete', component:SeeYouComponent},
  {path:'tableview',component:TableComponent},
  {path:'checkin',component: CheckinComponent},
  {path: 'assigntable', component:AssigntableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
