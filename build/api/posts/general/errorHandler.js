"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiErrorHandler = (err, req, res, next) => {
    console.log(req.app.get('env'));
    switch (req.app.get('env')) {
        case "development":
            console.log(err);
            return res.status(err.status).json(err);
        case "production":
            return res.status(err.status).json(err.publivVersion);
    }
};
