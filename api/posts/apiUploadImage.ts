import { DataStore } from "../../data/data";
import { RequestHandler } from "express";

// 请求所有 posts
export const apiUploadImage: RequestHandler = (req, res) => {

  // console.log(req.params.id);

  const postIndex = DataStore.posts.findIndex((item: any) => item.id == req.params.id);

  console.log(postIndex);

  if (postIndex == -1) {
    res.status(404).json({ status: "error", message: "post not found" });
  } else {
    // 上传图片
  }
}