import { DataStore } from "../../data/data";
import { NewPost } from "../../interface/newPost";
import { RequestHandler } from "express";
import uuid from "uuid/v4";


// 请求所有 posts
export const apiCreatePost: RequestHandler = (req, res) => {
  // 前端传递到后端的数据
  // console.log(req.body); // undefined

  // 构造 newPost 对象 类型：NewPost(定义接口) 
  const newPost: NewPost = {
    id: uuid(), // 生成唯一id值
    userId: req.body.userId || 1,
    title: req.body.title,
    body: req.body.body,
    price: req.body.price,
    currency: req.body.currency,
    img: []
  }

  DataStore.posts.push(newPost);
  // res.send("数据添加成功");
  res.json(newPost);
}