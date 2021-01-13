import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RsvpComponent } from './components/rsvp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DragulaModule } from 'ng2-dragula';
import { NgxStripeModule } from 'ngx-stripe';

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
import { PaymentsComponent } from './stripe/payments.component';
import { PaymentService } from './payment.service';


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
    PaymentsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    DragulaModule.forRoot(),
    NgxStripeModule.forRoot('pk_test_51I8nBQEc9ThdRQ56TjbO8qxruzAIJayeeCIGa6kPgvjgoBekdQDV9mRGxyxTvpxungGGi2ZtLIXKNwUPlqz2KhVp00ern9RzOn'),

  ],
  providers: [GuestService,InfoService, AuthService, RsvpService, PaymentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
