"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../../data/data");
const message_1 = require("../../model/shared/message");
// 请求所有 posts
exports.apiDeletePost = (req, res) => {
    // console.log(req.params.id);
    const postIndex = data_1.DataStore.posts.findIndex((item) => item.id == req.params.id);
    console.log(postIndex);
    if (postIndex > -1) {
        data_1.DataStore.posts.splice(postIndex, 1);
        // res.status(200).json({ status: "success", message: "delete success" });
        res.json(new message_1.PublicInfo("post deleted", 200));
    }
    else {
        // res.status(404).json({ status: "failed", message: "delete failed" });
        res.json(new message_1.APIError("Validation Error", "Post not found", 404));
    }
};
