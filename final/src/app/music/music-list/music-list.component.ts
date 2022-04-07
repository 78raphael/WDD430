import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Music } from '../music.model';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.css']
})
export class MusicListComponent implements OnInit {
  allMusic: Music[] = [];
  subscription: Subscription;

  constructor( private musicService: MusicService ) {
    this.musicService.getAllMusic();
   }

  ngOnInit() {
  
    this.subscription = this.musicService.musicChangedEvent.subscribe(
      (musicList: Music[]) => {
        console.log('music-list: ', musicList);
        this.allMusic = musicList;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
