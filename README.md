NodeJS+Typescript实战RESTFUL-API接口-文本接口

## 搭建本地服务器
1. 全局安装 typescript
npm i typescript -g

2. 生成ts的配置文件 tsconfig.json
tsc --init

3. tsc server.ts 转换
server.ts -> server.js

4. 上线依赖模块 
npm install express

5. 开发依赖模块
npm install @types/express -D
npm install @types/node -g

6. 转换+启动
tsc
node server.js


## 热启动项目配置
在 tsconfig.json 配置
```typescript
"target": "es2017", // es2017 = es6
 "outDir": "./build",
```
package.json
```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start-server": "tsc && node build/server.js",
    "start": "nodemon -e ts -w ./ -x npm run start-server"
  },
```


## 搭建自己的restfulapi

1. 新建json文件

2. 新建data.ts 导入json文件
```ts
import posts from './posts.json';
import todos from './todos.json';

export class DataStore {
  static posts = posts;
  static todos = todos;
}
```

3. server.js
```ts
import { DataStore } from "./data/data";

app.get("/posts", (req, res, next) => {
  res.json(DataStore.posts);
});
```

```
// console.log(DataStore.posts);
// 将一个 JavaScript 值（对象或者数组）转换为一个 JSON 字符串
// console.log(JSON.stringify(DataStore.posts));
// 用来解析JSON字符串，构造由字符串描述的JavaScript值或对象
// console.log(JSON.parse(JSON.stringify(DataStore.posts)));
```

## 优化请求和获取数据
### 代码抽离
server.js
```ts
app.get("/posts", (req, res, next) => {
  res.json(DataStore.posts);
});
```

转换为：
api/posts/apiGetPosts.ts
```ts
import { DataStore } from "../../data/data";
import { RequestHandler } from "express";

export const apiGetPosts: RequestHandler = (req, res, next) => {
  res.json(DataStore.posts);
}
```
server.js
```ts
import { apiGetPosts } from "./api/posts/apiGetPosts";
app.get("/posts", apiGetPosts);
```

### 获取具体数据、数据定义
```ts
import { PostSummary } from "../../model/shared/postSummary";

export const apiGetPostsDetail: RequestHandler = (req, res) => {
  // console.log(req.params.id); // 1
  DataStore.posts.forEach((item: any) => {
    // console.log(item);
    if (item.id == req.params.id) {
      // 实例化、对item进行数据定义
      res.json(new PostSummary(item));
    }
  })
}
```

server.js
```ts
app.get("/posts/:id", apiGetPostsDetail);
```


## 优化数据及难度加深
### 解决报错
Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client

优化：apiGetPostsDetail
```ts
export const apiGetPostsDetail: RequestHandler = (req, res) => {
  const selectPost = DataStore.posts.find((element: any) => element.id == req.params.id);

  if (selectPost) {
    res.json(new PostSummary(selectPost));
  } else {
    res.status(404).json({ status: "failed", message: "post not found" });
  }
}
```

### apiGetPostsDetail接口抽离
api 抽离
apiGetPosts
apiGetPostsDetail

postDetail.ts
todo.ts

posts.json
todos.json



## post数据到服务器
1. 获取请求的POST数据 安装中间件body-parser
```bash
npm i body-parser --save
```
2. 生成id uuid
```bash
生产环境
npm i uuid --save
开发环境下
npm i @types/uuid -D
```

调整posts id 数据类型 id: number => id: string

```ts
app.post("/posts", apiCreatePost);
```

## 删除 和更新数据
DELETE localhost:8091/posts/0dacb903-1313-473e-8e8c-d5b42b197968
PUT    localhost:8091/posts/1

## 手写中间件并理解中间件的作用
```ts
// 自定义中间件
const logger: express.RequestHandler = (req, res, next) => {
  console.log(new Date() + " - " + req.method + " - " + "Request to " + req.path);
  // 执行下一个需要执行的内容
  next();
}
// 相当于每个路由前加上一个logger
app.use(logger);
```

```ts
// 自定义验证中间件
const authenticator: CustomRequestHandler = (req, res, next) => {
  const username = 'tom';
  req.user = username;  // express.RequestHandler中没有user属性 => 自定义 CustomRequestHandler
  next();
}

// 自定义日志中间件
const logger: CustomRequestHandler = (req, res, next) => {
  console.log("user:" + req.user + " - " + new Date() + " - " + req.method + " - " + "Request to " + req.path);
  // 执行下一个需要执行的内容
  next();
}

// 相当于每个路由前加上一个logger
app.use(authenticator);
app.use(logger);
```



NodeJS+Typescript实战RESTFUL-API接口-图片接口

## 加深数据难度（增加图片）

## 添加图片
安装multer模块
```bash
npm install --save multer
```
multer模块 - Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件
这里用于上传图片到指定路径

## 



