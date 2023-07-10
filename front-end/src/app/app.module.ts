import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddressService } from './services/address.service';
import { RedirectComponent } from './redirect/redirect.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AppComponent, HomeComponent, RedirectComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
    ],
    providers: [AddressService],
    bootstrap: [AppComponent],
})
export class AppModule {}
