"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postSummary_1 = require("../../model/shared/postSummary");
const todo_1 = require("./todo");
// 继承
class PostDetail extends postSummary_1.PostSummary {
    // 构造 父级,
    constructor(postData, todoData, postImages) {
        super(postData);
        this.price = postData.price;
        this.currency = postData.currency;
        //           数组
        this.todos = todoData.map((item) => new todo_1.Todo(item));
        this.img = postImages;
    }
}
exports.PostDetail = PostDetail;
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
