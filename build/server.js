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
app.get("/posts", apiGetPosts_1.apiGetPosts);
app.get("/posts/:id", apiGetPostsDetail_1.apiGetPostsDetail);
// POST数据
app.post("/posts", apiCreatePost_1.apiCreatePost);
// 删除数据
app.delete("/posts/:id", apiDeletePost_1.apiDeletePost);
// 更新数据
app.put("/posts/:id", apiUpdatePost_1.apiUpdatePost);
// 上传图片
app.post("/posts/:id/img", apiUploadImage_1.apiUploadImage);
app.listen(process.env.PORT || 8091, function () {
    console.log("Server started...");
});
