"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../../data/data");
const static_1 = require("./general/static");
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
        const upload = static_1.getFileUploader(req.app.get("env"));
        upload(req, res, err => {
            if (err) {
                console.log(err);
                res.status(404).json({ status: "error", message: "File Upload Failed" });
            }
            else {
                // console.log(req.file.filename);
                data_1.DataStore.posts[postIndex].img.push(req.file.filename);
                res.status(200).json({ status: "success", message: "File Uploaded" });
            }
        });
    }
};
