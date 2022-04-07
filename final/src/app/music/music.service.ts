import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Lyrics } from './lyrics.model';
import { Music } from './music.model';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  allMusic: Music[] = [];
  lyrics: Lyrics[] = [];
  musicChangedEvent = new EventEmitter<Music[]>();

  constructor(private http: HttpClient) { }

  getAllMusic()  {
    try {
      console.log('inside getAllMusic');
      return this.http
        .get<Music[]>('http://localhost:3000/music',
          {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
          }
        )
        .subscribe({
          next:
          (music: Music[]) => {
            this.allMusic = music;
            console.log('Music: ', music);

            let musicListClone = this.allMusic.slice();
            this.musicChangedEvent.next(musicListClone);
          },
          error:
          (error: any) => {
            console.log('Error(getAllMusic): ', error);
          }
        });
    } catch(error)  {
      console.log('Error(try-catch): ', error);
    }
  }

  getMusic(id: string) {
    for(let i = 0; i < this.allMusic.length; i++) {
      let m = this.allMusic[i];
      console.log('m.id: ', m.id , ' ::: id: ', id);

      if (m.id == id)
        return m;
    }
    return null;
  }

  deleteMusic(music: Music) {
    if (!music) {
      return;
    }

    const pos = this.allMusic.findIndex(m => m.id === music.id);

    if (pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/music/' + music.id)
      .subscribe(
        // (response: Response) => {
        //   this.allMusic.splice(pos, 1);
        // }
      )
  }

  addMusic(music: Music) {
    if (!music) {
      return;
    }

    music.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.post<{ message: string, music: Music }>('http://localhost:3000/music',
      music,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.allMusic.push(responseData.music);
        }
      );
  }

  updateDocument(originalMusic: Music, newMusic: Music) {
    if (!originalMusic || !newMusic) {
      return;
    }

    const pos = this.allMusic.findIndex(m => m.id === originalMusic.id);

    if (pos < 0) {
      return;
    }

    newMusic.id = originalMusic.id;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.put('http://localhost:3000/music/' + originalMusic.id,
      newMusic, { headers: headers })
      .subscribe(
        // (response: Response) => {
        //   this.allMusic[pos] = newMusic;
        // }
      );
  }

}
