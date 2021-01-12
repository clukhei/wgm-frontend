import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RsvpComponent } from './components/rsvp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DragulaModule } from 'ng2-dragula';

import { GuestService } from './guest.service';
import { InfoService } from './info.service';
import { TemplateOneComponent } from './layouts/template-one.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SeeYouComponent } from './components/see-you.component';
import { TemplateTwoComponent } from './layouts/template-two.component';
import { HomeComponent } from './components/home.component';
import { TableComponent } from './components/table.component';
import { CheckinComponent } from './components/checkin.component';
import { AssigntableComponent } from './components/assigntable.component';
import { LoginComponent } from './components/login.component';
import { AuthService } from './auth.service';
import { RsvpService } from './rsvp.service';


@NgModule({
  declarations: [
    AppComponent,
    RsvpComponent,

    TemplateOneComponent,
    SeeYouComponent,
    TemplateTwoComponent,
    HomeComponent,
    TableComponent,
    CheckinComponent,
    AssigntableComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    DragulaModule.forRoot()

  ],
  providers: [GuestService,InfoService, AuthService, RsvpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
