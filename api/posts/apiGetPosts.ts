import { DataStore } from "../../data/data";
import { RequestHandler } from "express";
import { PostSummary } from "../../model/shared/postSummary";

// 请求所有 posts
export const apiGetPosts: RequestHandler = (req, res) => {
  res.json(DataStore.posts.map((item: any) => new PostSummary(item)));
}
