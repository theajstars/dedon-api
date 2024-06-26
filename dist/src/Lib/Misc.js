"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnSuccessResponseObject = exports.UnauthorizedResponseObject = void 0;
exports.UnauthorizedResponseObject = {
    status: true,
    statusCode: 401,
    message: "Unauthorized Request",
};
const returnSuccessResponseObject = (message, statusCode, data) => {
    return {
        status: true,
        statusCode: statusCode !== null && statusCode !== void 0 ? statusCode : 200,
        message,
        data,
    };
};
exports.returnSuccessResponseObject = returnSuccessResponseObject;
//# sourceMappingURL=Misc.js.map