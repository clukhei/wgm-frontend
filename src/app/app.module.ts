import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RsvpComponent } from './components/rsvp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './components/main.component';
import { GenerateLinkComponent } from './components/generate-link.component'
import { RsvpService } from './rsvp.service';
import { InfoService } from './info.service';
import { TemplateOneComponent } from './layouts/template-one.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    RsvpComponent,
    MainComponent,
    GenerateLinkComponent,
    TemplateOneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,

  ],
  providers: [RsvpService, InfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
