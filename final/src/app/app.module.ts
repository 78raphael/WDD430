import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FinalRoutingModule } from './final-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { HomeComponent } from './home/home.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { MusicComponent } from './music/music.component';
import { MusicListComponent } from './music/music-list/music-list.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DropdownDirective,
    MusicComponent,
    MusicListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FinalRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
