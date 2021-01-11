import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RsvpComponent } from './components/rsvp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { GenerateLinkComponent } from './components/generate-link.component'
import { RsvpService } from './rsvp.service';
import { InfoService } from './info.service';
import { TemplateOneComponent } from './layouts/template-one.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SeeYouComponent } from './components/see-you.component';
import { TemplateTwoComponent } from './layouts/template-two.component';
import { HomeComponent } from './components/home.component';
import { TableComponent } from './components/table.component';

@NgModule({
  declarations: [
    AppComponent,
    RsvpComponent,

    GenerateLinkComponent,
    TemplateOneComponent,
    SeeYouComponent,
    TemplateTwoComponent,
    HomeComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,

  ],
  providers: [RsvpService,InfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
