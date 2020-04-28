import { DataStore } from "../../data/data";
import { NewPost } from "../../interface/newPost";
import { RequestHandler } from "express";
import uuid from "uuid/v4";
import { APIError, PublicInfo } from "../../model/shared/message";


// 请求所有 posts
export const apiCreatePost: RequestHandler = (req, res, next) => {
  // 前端传递到后端的数据
  // console.log(req.body); // undefined

  const requireFields = ["title", "body"];
  const givenFields = Object.getOwnPropertyNames(req.body);
  if (!requireFields.every(filed => givenFields.includes(filed))) {
    // 使用 APIError 接口 返回错误信息
    return next(new APIError("Data missing", "not all required", 400));
  }

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
  // res.json(newPost);

  // 使用 PublicInfo 信息接口返回信息
  res.json(new PublicInfo("post added", 200, { post: newPost }));
}