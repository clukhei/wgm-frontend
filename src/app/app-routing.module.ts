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
import { SuccessComponent } from './stripe/success.component';
import { FailureComponent } from './stripe/failure.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthService] },
  {path: 'rsvp/:token', component: RsvpComponent},
  {path:'complete', component:SeeYouComponent},
  {path:'tableview',component:TableComponent, canActivate: [AuthService]},
  {path:'checkin',component: CheckinComponent},
  {path: 'assigntable', component:AssigntableComponent, canActivate: [AuthService]},
  {path: 'payment/success', component: SuccessComponent},
  {path: 'payment/failure', component :FailureComponent},
  {path: "**", redirectTo: "/", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
