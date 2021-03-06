"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const apiGetPosts_1 = require("./api/posts/apiGetPosts");
const apiGetPostsDetail_1 = require("./api/posts/apiGetPostsDetail");
const apiCreatePost_1 = require("./api/posts/apiCreatePost");
const apiDeletePost_1 = require("./api/posts/apiDeletePost");
const apiUpdatePost_1 = require("./api/posts/apiUpdatePost");
const apiUploadImage_1 = require("./api/posts/apiUploadImage");
const errorHandler_1 = require("./api/posts/general/errorHandler");
const message_1 = require("./model/shared/message");
const dateParam_1 = require("./api/posts/general/reqParams/dateParam");
const app = express_1.default();
// parse application/x-www-form-urlencoded 解析"application/x-www-form-urlencoded"格式
app.use(body_parser_1.default.urlencoded({ extended: false }));
// parse application/json 解析json
app.use(body_parser_1.default.json());
// 配置static指向的路径 访问 /static 触发后面的方法
app.use("/static", express_1.default.static(path_1.default.resolve("./", "public", "img")));
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
app.get("/posts", apiGetPosts_1.apiGetPosts);
// 根据 id 请求 posts
app.get("/posts/:id", apiGetPostsDetail_1.apiGetPostsDetail);
// POST数据
app.post("/posts", apiCreatePost_1.apiCreatePost);
// 删除数据
app.delete("/posts/:id", apiDeletePost_1.apiDeletePost);
// 更新数据
app.put("/posts/:id", apiUpdatePost_1.apiUpdatePost);
// 上传图片
app.post("/posts/:id/img", apiUploadImage_1.apiUploadImage);
// 重启服务 http://localhost:8091/posts/1
// 处理错误信息
app.use(errorHandler_1.apiErrorHandler);
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
        next();
    }
    else {
        next(new message_1.APIError("Content Type Not supported", "This API only supports application/json", 400));
    }
});
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
app.param("formDate", dateParam_1.dateParam);
app.param("toDate", dateParam_1.dateParam);
app.listen(process.env.PORT || 8091, function () {
    console.log("Server started...");
});
