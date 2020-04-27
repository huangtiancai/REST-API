import { DataStore } from "../../data/data";
import { RequestHandler } from "express";
import { getFileUploader } from "./general/static";

// 请求所有 posts
export const apiUploadImage: RequestHandler = (req, res) => {

  // console.log(req.params.id);

  const postIndex = DataStore.posts.findIndex((item: any) => item.id == req.params.id);

  // console.log(postIndex);

  if (postIndex == -1) {
    res.status(404).json({ status: "error", message: "post not found" });
  } else {
    // 上传图片
    const upload = getFileUploader(req.app.get("env"));
    upload(req, res, err => {
      if (err) {
        console.log(err);
        res.status(404).json({ status: "error", message: "File Upload Failed" });
      } else {
        // console.log(req.file.filename);
        DataStore.posts[postIndex].img.push(req.file.filename);
        res.status(200).json({ status: "success", message: "File Uploaded" });
      }
    })
  }
}