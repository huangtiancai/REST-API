"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../../data/data");
const postSummary_1 = require("../../model/shared/postSummary");
exports.apiGetPosts = (req, res) => {
    res.json(data_1.DataStore.posts.map((item) => new postSummary_1.PostSummary(item)));
};
exports.apiGetPostsDetail = (req, res) => {
    // console.log(req.params.id); // 1
    data_1.DataStore.posts.forEach((item) => {
        // console.log(item);
        if (item.id == req.params.id) {
            // 实例化、对item进行数据定义
            res.json(new postSummary_1.PostSummary(item));
        }
    });
};
