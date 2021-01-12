import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssigntableComponent } from './components/assigntable.component';
import { CheckinComponent } from './components/checkin.component';
import { HomeComponent } from './components/home.component';
import { RsvpComponent } from './components/rsvp.component';
import { SeeYouComponent } from './components/see-you.component';
import { TableComponent } from './components/table.component';
import { LoginComponent} from './components/login.component';
import { AuthService } from './auth.service';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthService] },
  {path: 'rsvp/:token', component: RsvpComponent},
  {path:'complete', component:SeeYouComponent},
  {path:'tableview',component:TableComponent, canActivate: [AuthService]},
  {path:'checkin',component: CheckinComponent},
  {path: 'assigntable', component:AssigntableComponent, canActivate: [AuthService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
