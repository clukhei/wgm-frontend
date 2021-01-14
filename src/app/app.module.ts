import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RsvpComponent } from './components/rsvp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxStripeModule } from 'ngx-stripe';

import { GuestService } from './guest.service';
import { InfoService } from './info.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SeeYouComponent } from './components/see-you.component';

import { HomeComponent } from './components/home.component';

import { CheckinComponent } from './components/checkin.component';

import { LoginComponent } from './components/login.component';
import { AuthService } from './auth.service';
import { RsvpService } from './rsvp.service';
import { PaymentsComponent } from './stripe/payments.component';
import { PaymentService } from './payment.service';
import { SuccessComponent } from './stripe/success.component';
import { FailureComponent } from './stripe/failure.component';


@NgModule({
  declarations: [
    AppComponent,
    RsvpComponent,


    SeeYouComponent,

    HomeComponent,

    CheckinComponent,

    LoginComponent,
    PaymentsComponent,
    SuccessComponent,
    FailureComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  
    //stripe's publishable key
    NgxStripeModule.forRoot('pk_test_51I8nBQEc9ThdRQ56TjbO8qxruzAIJayeeCIGa6kPgvjgoBekdQDV9mRGxyxTvpxungGGi2ZtLIXKNwUPlqz2KhVp00ern9RzOn'),

  ],
  providers: [GuestService, InfoService, AuthService, RsvpService, PaymentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
