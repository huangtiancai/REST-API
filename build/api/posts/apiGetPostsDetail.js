"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../../data/data");
// import { PostSummary } from "../../model/shared/postSummary";
const postDetail_1 = require("../../model/shared/postDetail");
// 根据id请求posts
exports.apiGetPostsDetail = (req, res) => {
    const selectPost = data_1.DataStore.posts.find((element) => element.id == req.params.id);
    if (selectPost) {
        // 过滤 todos.postId == /posts/:id => /posts/2
        const selectedTodos = data_1.DataStore.todos.filter((item) => item.postId == req.params.id);
        const imgURLs = selectPost.img.map((item) => {
            if (req.app.get("env") == "development") {
                return "http://localhost:8091/static/" + item;
            }
            else {
                return "http://localhost:8091/static/" + item;
            }
        });
        // 打印 imgURLs
        console.log(imgURLs);
        // 获取环境(开发 or 生产)
        // console.log(req.app.get("env")); // development
        res.json(new postDetail_1.PostDetail(selectPost, selectedTodos, imgURLs));
    }
    else {
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
};
