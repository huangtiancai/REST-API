export class PostSummary {
  userId: number;
  id: number;
  title: String;
  body: String;
  constructor(data: any) {
    this.userId = data.userId;
    this.id = data.id;
    this.title = data.title;
    this.body = data.body
  }
}