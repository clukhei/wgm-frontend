import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main.component';
import { RsvpComponent } from './components/rsvp.component';

const routes: Routes = [
  {path: 'home', component: MainComponent },
  {path: 'rsvp/:rsId/:token', component: RsvpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
