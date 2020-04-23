import express from 'express';
import { apiGetPosts, apiGetPostsDetail } from "./api/posts/apiGetPosts";

const app = express();

// console.log(DataStore.posts);
// 将一个 JavaScript 值（对象或者数组）转换为一个 JSON 字符串
// console.log(JSON.stringify(DataStore.posts));
// 用来解析JSON字符串，构造由字符串描述的JavaScript值或对象
// console.log(JSON.parse(JSON.stringify(DataStore.posts)));

// routes
app.get("/", (req, res, next) => {
  res.send("node typescript api is working...");
});

app.get("/posts", apiGetPosts);
app.get("/posts/:id", apiGetPostsDetail);

app.post("/tours", (req, res, next) => {
  res.send("post tours...");
});

app.listen(process.env.PORT || 8091, function () {
  console.log("Server started...");
});
