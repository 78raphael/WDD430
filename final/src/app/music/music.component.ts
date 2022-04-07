import { Component, OnInit } from '@angular/core';
import { Music } from './music.model';
import { MusicService } from './music.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css'],
  providers: [MusicService]
})
export class MusicComponent implements OnInit {
  selectedMusic: Music;

  constructor(private musicService: MusicService) { }

  ngOnInit() {
    this.musicService.musicChangedEvent.subscribe(
      (music: Music) => {
        this.selectedMusic = music;
      }
    );
  }

}
