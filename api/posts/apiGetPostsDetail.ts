import { DataStore } from "../../data/data";
import { RequestHandler } from "express";
// import { PostSummary } from "../../model/shared/postSummary";
import { PostDetail } from "../../model/shared/postDetail";


// 根据id请求posts
export const apiGetPostsDetail: RequestHandler = (req, res) => {
  const selectPost = DataStore.posts.find((element: any) => element.id == req.params.id);

  if (selectPost) {
    const selectedTodos = DataStore.todos.filter((item: any) => item.postId == req.params.id);
    res.json(new PostDetail(selectPost, selectedTodos));
  } else {
    res.status(404).json({ status: "failed", message: "post not found" });
  }


  // 报错
  // DataStore.posts.forEach((item: any) => {
  //   // console.log(item);
  //   if (item.id == req.params.id) {
  //     // 实例化、对item进行数据定义
  //     res.json(new PostSummary(item));
  //   } else {
  //     res.status(404).json({ status: "failed", message: "post not found" });
  //   }
  // })
}