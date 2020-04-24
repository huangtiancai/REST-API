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


## 删除 和更新数据