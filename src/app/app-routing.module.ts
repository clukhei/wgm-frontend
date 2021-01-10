import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main.component';
import { RsvpComponent } from './components/rsvp.component';
import { SeeYouComponent } from './components/see-you.component';

const routes: Routes = [
  {path: 'home', component: MainComponent },
  {path: 'rsvp/:rsId/:token', component: RsvpComponent},
  {path:'rsvp/complete', component:SeeYouComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
