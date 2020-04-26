"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../../data/data");
// 请求所有 posts
exports.apiUploadImage = (req, res) => {
    // console.log(req.params.id);
    const postIndex = data_1.DataStore.posts.findIndex((item) => item.id == req.params.id);
    console.log(postIndex);
    if (postIndex == -1) {
        res.status(404).json({ status: "error", message: "post not found" });
    }
    else {
        // 上传图片
    }
};
