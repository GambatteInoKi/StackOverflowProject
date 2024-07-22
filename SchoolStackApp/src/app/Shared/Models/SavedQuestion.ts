export class SavedQuestion {
  id: number;
  title: string;
  link: string;
  score: number;
  creationDate: Date;
  tags?: string;
  viewCount?: number;
  owner?: string;
  userId: number;
  username: string;
  categoryName: string;
  notes: string;

  constructor(
    id: number,
    title: string,
    link: string,
    score: number,
    creationDate: Date,
    userId: number,
    categoryName: string = 'Uncategorized',
    tags?: string,
    viewCount?: number,
    username: string = "",
    owner?: string,
    notes: string = ''
  ) {
    this.id = id;
    this.title = title;
    this.link = link;
    this.score = score;
    this.creationDate = creationDate;
    this.userId = userId;
    this.categoryName = categoryName;
    this.tags = tags;
    this.username = username;
    this.viewCount = viewCount;
    this.owner = owner;
    this.notes = notes;
  }
}
