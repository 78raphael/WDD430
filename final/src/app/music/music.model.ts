export class Music {
  public id: string;
  public title: string;
  public description: string;
  public artist: string;
  public lyricId: string;

  constructor  (id: string, title: string, description: string, artist: string, lyricId: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.artist = artist;
    this.lyricId = lyricId;
  }
}