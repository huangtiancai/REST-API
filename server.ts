import express from 'express';
import bodyParser from "body-parser";
import path from "path";
import { apiGetPosts } from "./api/posts/apiGetPosts";
import { apiGetPostsDetail } from "./api/posts/apiGetPostsDetail";
import { apiCreatePost } from "./api/posts/apiCreatePost";
import { apiDeletePost } from "./api/posts/apiDeletePost";
import { apiUpdatePost } from "./api/posts/apiUpdatePost";
import { apiUploadImage } from "./api/posts/apiUploadImage";
import { CustomRequestHandler } from "./interface/express";
import { apiErrorHandler } from './api/posts/general/errorHandler';
import { APIError } from './model/shared/message';
import { dateParam } from "./api/posts/general/reqParams/dateParam";

const app = express();

// parse application/x-www-form-urlencoded 解析"application/x-www-form-urlencoded"格式
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json 解析json
app.use(bodyParser.json())

// 配置static指向的路径 访问 /static 触发后面的方法
app.use("/static", express.static(path.resolve("./", "public", "img")));


// 自定义验证中间件
// const authenticator: CustomRequestHandler = (req, res, next) => {
//   const username = 'tom';
//   req.user = username;  // express.RequestHandler中没有user属性 => 自定义 CustomRequestHandler
//   next();
// }

// 自定义日志中间件
// const logger: CustomRequestHandler = (req, res, next) => {
//   console.log("user:" + req.user + " - " + new Date() + " - " + req.method + " - " + "Request to " + req.path);
//   // 执行下一个需要执行的内容
//   next();
// }

// 相当于每个路由前加上一个logger
// app.use(authenticator);
// app.use(logger);


// routes
app.get("/", (req, res, next) => {
  res.send("node typescript api is working...");
});

// 请求中可以放入中间件
// app.get("/posts", logger, apiGetPosts);  // 先打印logger => 再执行请求方法

// 请求所有posts
app.get("/posts", apiGetPosts);

// 根据 id 请求 posts
app.get("/posts/:id", apiGetPostsDetail);

// POST数据
app.post("/posts", apiCreatePost);

// 删除数据
app.delete("/posts/:id", apiDeletePost);

// 更新数据
app.put("/posts/:id", apiUpdatePost);

// 上传图片
app.post("/posts/:id/img", apiUploadImage);

// 重启服务 http://localhost:8091/posts/1

// 处理错误信息
app.use(apiErrorHandler);


// 剖析Request对象
// GET http://localhost:8091/posts/id2/todos?start=5

/*
  GET:req.method
  http:req.protocol
  lhost:req.hostname
  port:environment
  posts/id2/todos:req.originalURL
  id2:req.params = {postID:id2}
  ?start=5:req.query = {star：5}
  req.app
  req.body
  req.headers
  req.secure,req.cokies,req.fresh...
*/

app.use((req, res, next) => {
  if (req.accepts("application/json")) {
    next()
  } else {
    next(new APIError(
      "Content Type Not supported",
      "This API only supports application/json",
      400)
    );
  }
})

// req.headers
app.get('/headers', (req, res, next) => {
  res.json(req.headers);
});

app.post('/headers', (req, res, next) => {
  res.json(req.headers);
});


// 请求参数深入讲解
app.get("/booking/:id", (req, res, next) => {
  res.json(req.params);
});


// 设置请求参数格式
const dataFormat = '\\d{4}-\\d{1,2}-\\d{1,2}';
app.get(`/booking/:formDate(${dataFormat})/:toDate(${dataFormat})`, (req, res, next) => {
  res.json(req.params);
});

// {
//   "formDate": "2020-01-01",
//     "toDate": "2021-01-01"
// }



app.get(`/booking/:formDate/:toDate)`, (req, res, next) => {
  res.json(req.params);
});

app.param("formDate", dateParam);
app.param("toDate", dateParam);



app.listen(process.env.PORT || 8091, function () {
  console.log("Server started...");
});
