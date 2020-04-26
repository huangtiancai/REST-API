import { DataStore } from "../../data/data";
import { RequestHandler } from "express";
// import { PostSummary } from "../../model/shared/postSummary";
import { PostDetail } from "../../model/shared/postDetail";


// 根据id请求posts
export const apiGetPostsDetail: RequestHandler = (req, res) => {
  const selectPost = DataStore.posts.find((element: any) => element.id == req.params.id);

  if (selectPost) {
    // 过滤 todos.postId == /posts/:id => /posts/2
    const selectedTodos = DataStore.todos.filter((item: any) => item.postId == req.params.id);


    const imgURLs = selectPost.img.map((item: string) => {
      if (req.app.get("env") == "development") {
        return "http://localhost:8091/static/" + item;
      } else {
        return "http://localhost:8091/static/" + item;
      }

    });

    // 打印 imgURLs
    console.log(imgURLs);

    // 获取环境(开发 or 生产)
    // console.log(req.app.get("env")); // development

    res.json(new PostDetail(selectPost, selectedTodos, imgURLs));
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