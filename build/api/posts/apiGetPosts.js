"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../../data/data");
const postSummary_1 = require("../../model/shared/postSummary");
exports.apiGetPosts = (req, res) => {
    res.json(data_1.DataStore.posts.map((item) => new postSummary_1.PostSummary(item)));
};
exports.apiGetPostsDetail = (req, res) => {
    const selectPost = data_1.DataStore.posts.find((element) => element.id = req.params.id);
    // console.log(selectPost);
    if (selectPost) {
        res.json(new postSummary_1.PostSummary(selectPost));
    }
    else {
        res.status(404).json({ status: "failed", message: "post not found" });
    }
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
