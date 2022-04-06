export class Lyrics {
  id: string;
  musicId: string;
  lyrics: string[];

  constructor (id: string, musicId: string, lyrics: string[])  {
    this.id = id;
    this.musicId = musicId;
    this.lyrics = lyrics;
  }
}