"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const v4_1 = __importDefault(require("uuid/v4"));
function getFileUploader(env) {
    switch (env) {
        case 'development':
            const fileID = v4_1.default();
            const fileStorage = multer_1.default.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, path_1.default.resolve('./', 'public', 'img'));
                },
                filename: function (req, file, cb) {
                    cb(null, fileID + path_1.default.extname(file.originalname));
                }
            });
            // 文件类型
            return multer_1.default({ storage: fileStorage }).single('file');
        case 'production':
            return (req, res, next) => { next(); };
        default:
            return (req, res, next) => { next(); };
    }
}
exports.getFileUploader = getFileUploader;
