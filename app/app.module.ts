import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatToolbarModule
} from '@angular/material';

@NgModule({
    imports: [BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatCheckboxModule, HttpClientModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
