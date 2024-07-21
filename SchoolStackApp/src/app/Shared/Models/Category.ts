export class Category {
    id: number;
    name: string;
    userid: number;
  
    constructor(
      id: number,
      name: string,
      userid: number
    ) {
      this.id = id;
      this.name = name;
      this.userid = userid;
    }
  }