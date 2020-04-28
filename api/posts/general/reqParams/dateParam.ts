import { RequestParamHandler } from "express";

export const dateParam: RequestParamHandler = (req, res, next, value, name) => {
  console.log(name + " : " + value);
}