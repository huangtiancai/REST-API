"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../../data/data");
// import { PostSummary } from "../../model/shared/postSummary";
const postDetail_1 = require("../../model/shared/postDetail");
// 根据id请求posts
exports.apiGetPostsDetail = (req, res) => {
    const selectPost = data_1.DataStore.posts.find((element) => element.id == req.params.id);
    if (selectPost) {
        const selectedTodos = data_1.DataStore.todos.filter((item) => item.postId == req.params.id);
        res.json(new postDetail_1.PostDetail(selectPost, selectedTodos));
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
