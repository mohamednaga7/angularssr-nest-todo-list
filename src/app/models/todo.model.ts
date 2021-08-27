export class Todo {
  constructor(
    public _id: string,
    public title: string,
    public done: boolean = false
  ) { }
}
