import { RequestHandler } from "express";
import multer from "multer";
import path from "path";
import uuid from "uuid/v4";

export function getFileUploader(env: string): RequestHandler {
  switch (env) {
    case 'development':

      const fileID = uuid();

      const fileStorage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, path.resolve('./', 'public', 'img'))
        },
        filename: function (req, file, cb) {
          cb(null, fileID + path.extname(file.originalname))
        }
      });
      // 文件类型
      return multer({ storage: fileStorage }).single('file');

    case 'production':
      return (req, res, next) => { next() }
    default:
      return (req, res, next) => { next() }
  }
}
