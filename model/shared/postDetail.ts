import { PostSummary } from "../../model/shared/postSummary";
import { Todo } from "./todo";

// 继承
export class PostDetail extends PostSummary {
  // 定义自己
  price: number;
  currency: string;

  todos: Todo;
  img: string[]

  // 构造 父级,
  constructor(postData: any, todoData: any, postImages: string[]) {
    super(postData);
    this.price = postData.price;
    this.currency = postData.currency;
    //           数组
    this.todos = todoData.map((item: any) => new Todo(item));
    this.img = postImages;
  }
}

// 继承
// userId: number;
// id: number;
// title: String;
// body: String;

// 定义自己
// price: number;
// currency: string;

// todos: Todo;
// {
//   "postId": 1,
//   "todoTitle": "todo title 1",
//   "tidoText": "1 - delectus aut autem",
//   "star": 4
// }