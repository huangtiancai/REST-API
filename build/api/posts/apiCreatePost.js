"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../../data/data");
const v4_1 = __importDefault(require("uuid/v4"));
const message_1 = require("../../model/shared/message");
// 请求所有 posts
exports.apiCreatePost = (req, res, next) => {
    // 前端传递到后端的数据
    // console.log(req.body); // undefined
    const requireFields = ["title", "body"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requireFields.every(filed => givenFields.includes(filed))) {
        // 使用 APIError 接口 返回错误信息
        return next(new message_1.APIError("Data missing", "not all required", 400));
    }
    // 构造 newPost 对象 类型：NewPost(定义接口) 
    const newPost = {
        id: v4_1.default(),
        userId: req.body.userId || 1,
        title: req.body.title,
        body: req.body.body,
        price: req.body.price,
        currency: req.body.currency,
        img: []
    };
    data_1.DataStore.posts.push(newPost);
    // res.send("数据添加成功");
    // res.json(newPost);
    // 使用 PublicInfo 信息接口返回信息
    res.json(new message_1.PublicInfo("post added", 200, { post: newPost }));
};
