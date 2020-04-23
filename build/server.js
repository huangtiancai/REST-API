"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiGetPosts_1 = require("./api/posts/apiGetPosts");
const app = express_1.default();
// console.log(DataStore.posts);
// 将一个 JavaScript 值（对象或者数组）转换为一个 JSON 字符串
// console.log(JSON.stringify(DataStore.posts));
// 用来解析JSON字符串，构造由字符串描述的JavaScript值或对象
// console.log(JSON.parse(JSON.stringify(DataStore.posts)));
// routes
app.get("/", (req, res, next) => {
    res.send("node typescript api is working...");
});
app.get("/posts", apiGetPosts_1.apiGetPosts);
app.get("/posts/:id", apiGetPosts_1.apiGetPostsDetail);
app.post("/tours", (req, res, next) => {
    res.send("post tours...");
});
app.listen(process.env.PORT || 8091, function () {
    console.log("Server started...");
});
