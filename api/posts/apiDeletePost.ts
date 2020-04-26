import { RequestHandler } from "express";
import { DataStore } from "../../data/data";


// 请求所有 posts
export const apiDeletePost: RequestHandler = (req, res) => {
  // console.log(req.params.id);

  const postIndex = DataStore.posts.findIndex((item: any) => item.id == req.params.id);

  console.log(postIndex);

  if (postIndex > -1) {
    DataStore.posts.splice(postIndex, 1);
    res.status(200).json({ status: "success", message: "delete success" });
  } else {
    res.status(404).json({ status: "failed", message: "delete failed" });
  }
}
