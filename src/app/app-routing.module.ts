import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { RsvpComponent } from './components/rsvp.component';
import { SeeYouComponent } from './components/see-you.component';
import { TableComponent } from './components/table.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'rsvp/:rsId/:token', component: RsvpComponent},
  {path:'rsvp/complete', component:SeeYouComponent},
  {path:'tableview',component:TableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
