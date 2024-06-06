"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
function default_1(app) {
    let defaultConfig = {
        method: "get",
        maxBodyLength: Infinity,
        headers: {},
    };
    app.post(`/url-history`, (req, res) => __awaiter(this, void 0, void 0, function* () {
        let config = Object.assign(Object.assign({}, defaultConfig), { url: "https://www.ipqualityscore.com/api/json/requests/XWLVJZNqiRWZsHAmnq1GLOQl8DayorxU/list?type=url&start_date=2024-01-01&stop_date=2024-09-09" });
        let results = [];
        const rEmail = yield (0, axios_1.default)(config);
        if (rEmail && rEmail.data && rEmail.data.success) {
            results = [...results, ...rEmail.data.requests];
        }
        res.json({
            status: rEmail && rEmail.data ? true : false,
            statusCode: rEmail && rEmail.data ? 200 : 500,
            data: results,
            length: results.length,
        });
    }));
    app.post(`/email-history`, (req, res) => __awaiter(this, void 0, void 0, function* () {
        let config = Object.assign(Object.assign({}, defaultConfig), { url: "https://www.ipqualityscore.com/api/json/requests/XWLVJZNqiRWZsHAmnq1GLOQl8DayorxU/list?type=email&start_date=2024-01-01&stop_date=2024-09-09" });
        let results = [];
        const rEmail = yield (0, axios_1.default)(config);
        if (rEmail && rEmail.data && rEmail.data.success) {
            results = [...results, ...rEmail.data.requests];
        }
        res.json({
            status: rEmail && rEmail.data ? true : false,
            statusCode: rEmail && rEmail.data ? 200 : 500,
            data: results,
            length: results.length,
        });
    }));
    app.post(`/email-scan`, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { email } = req.body;
        let config = Object.assign(Object.assign({}, defaultConfig), { url: `https://www.ipqualityscore.com/api/json/email/XWLVJZNqiRWZsHAmnq1GLOQl8DayorxU/${email}` });
        const r = yield (0, axios_1.default)(config);
        res.json({
            status: r && r.data ? true : false,
            statusCode: r && r.data ? 200 : 500,
            data: r.data,
        });
    }));
    app.post(`/database-scan`, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { email } = req.body;
        let config = Object.assign(Object.assign({}, defaultConfig), { url: `https://www.ipqualityscore.com/api/json/leaked/email/XWLVJZNqiRWZsHAmnq1GLOQl8DayorxU/${email}` });
        const r = yield (0, axios_1.default)(config);
        res.json({
            status: r && r.data ? true : false,
            statusCode: r && r.data ? 200 : 500,
            data: r.data,
        });
    }));
    app.post(`/scan-url`, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { url } = req.body;
        let config = Object.assign(Object.assign({}, defaultConfig), { url: `https://www.ipqualityscore.com/api/json/url/XWLVJZNqiRWZsHAmnq1GLOQl8DayorxU/${url}` });
        const r = yield (0, axios_1.default)(config);
        res.json({
            status: r && r.data ? true : false,
            statusCode: r && r.data ? 200 : 500,
            data: r.data,
        });
    }));
}
exports.default = default_1;
//# sourceMappingURL=routes.js.map