import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Lyrics } from './lyrics.model';
import { Music } from './music.model';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  music: Music[] = [];
  lyrics: Lyrics[] = [];
  musicChangedEvent = new EventEmitter<Music[]>();

  constructor(private http: HttpClient) {
    this.getAllMusic();
   }

  getAllMusic()  {
    try {
      console.log('inside getAllMusic');
      console.log( this.http
        .get<Music[]>('http://localhost:3000/music',
          {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
          }
        )
        .subscribe({
          next:
          (music: Music[]) => {
            this.music = music;
            console.log('Music: ', music);

            // let musicListClone = this.music.slice();
            // this.musicChangedEvent.next(musicListClone);
          },
          error:
          (error: any) => {
            console.log('Error(getAllMusic): ', error);
          }
        })
      );
    } catch(error)  {
      console.log('Error(try-catch): ', error);
    }
  }
}
