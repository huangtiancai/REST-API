import { DataStore } from "../../data/data";
import { NewPost } from "../../interface/newPost";
import { RequestHandler } from "express";

// 请求所有 posts
export const apiUpdatePost: RequestHandler = (req, res) => {

  // console.log(req.params.id);

  const postIndex = DataStore.posts.findIndex((item: any) => item.id == req.params.id);

  // console.log(postIndex);

  if (postIndex > -1) {
    // 获取原有数据
    const originalPost = DataStore.posts[postIndex];

    const updatePost: NewPost = {
      id: req.params.id,
      userId: req.body.userId || originalPost.userId,
      title: req.body.title || originalPost.title,
      body: req.body.body || originalPost.body,
      price: req.body.price || originalPost.price,
      currency: req.body.currency || originalPost.currency,
      img: originalPost.img
    }

    // 更新数据
    DataStore.posts[postIndex] = updatePost;
    res.status(200).json({ status: "success", message: "update success" });
  } else {
    res.status(404).json({ status: "failed", message: "update failed" });
  }
}