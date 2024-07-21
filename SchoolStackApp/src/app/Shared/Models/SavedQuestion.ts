export class SavedQuestion {
  id: number;
  title: string;
  link: string;
  score: number;
  creationDate: Date;
  tags?: string;
  viewCount?: number;
  owner?: string;

  constructor(
    id: number,
    title: string,
    link: string,
    score: number,
    creationDate: Date,
    tags?: string,
    viewCount?: number,
    owner?: string) {
    this.id = id;
    this.title = title;
    this.link = link;
    this.score = score;
    this.creationDate = creationDate;
    this.tags = tags;
    this.viewCount = viewCount;
    this.owner = owner;
  }
}
