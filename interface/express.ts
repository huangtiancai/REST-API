// 重写 req, res, next

import { Request, Response, NextFunction } from "express";

// 重写 Request
export interface CumtomRequest extends Request {
  // 自定义属性
  user?: string
}

export interface CumtomResponse extends Response {
  // 空白 => 继承Response 使用Response本身
}

// 重命名
export type CustomRequestHandler = (
  req: CumtomRequest,
  res: CumtomResponse,
  next: NextFunction
) => any;