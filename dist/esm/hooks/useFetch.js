var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useState } from "react";
import { useFetchWrapper } from "../context/FetchContext";
export var UseFetchConst = /** @class */ (function () {
    function UseFetchConst() {
    }
    UseFetchConst.headers = {};
    return UseFetchConst;
}());
export var useFetch = function (uri, method, options) {
    var _a = options.headers, headers = _a === void 0 ? {} : _a, _b = options.useErrorView, useErrorView = _b === void 0 ? true : _b, _c = options.useCache, useCache = _c === void 0 ? false : _c, _d = options.ttlCache, ttlCache = _d === void 0 ? 300000 : _d, _e = options.useLogs, useLogs = _e === void 0 ? false : _e;
    // 300000 IS 5 MINUTE
    var _f = useState(), data = _f[0], setData = _f[1];
    var _g = useState(), error = _g[0], setError = _g[1];
    var _h = useState(false), isLoading = _h[0], setLoading = _h[1];
    var _j = useFetchWrapper(), openErrorView = _j.setError, API_URL = _j.baseUrl, cacheUris = _j.cacheUris, globalError = _j.globalError;
    var sendRequest = function (props) { return __awaiter(void 0, void 0, void 0, function () {
        var contentType, args, REQUEST_URI, res_1, now, response, x, e_1;
        var _a;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (method === "GET" && (props === null || props === void 0 ? void 0 : props.body) !== undefined) {
                        throw new Error("you should remove body if request is get");
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, 5, 6]);
                    contentType = (_b = props === null || props === void 0 ? void 0 : props.contentType) !== null && _b !== void 0 ? _b : "application/json";
                    setLoading(true);
                    args = {
                        method: method,
                        headers: __assign(__assign({ "content-type": contentType }, headers), UseFetchConst.headers),
                    };
                    setData(undefined);
                    REQUEST_URI = "".concat(API_URL).concat(uri);
                    if (useCache === true && cacheUris.current[REQUEST_URI]) {
                        res_1 = cacheUris.current[REQUEST_URI];
                        now = new Date().getTime();
                        if (now < res_1.ttl) {
                            if (useLogs) {
                                console.log("return cacheval!");
                            }
                            setTimeout(function () {
                                setData(res_1.response);
                            }, 0);
                            return [2 /*return*/, setLoading(false)];
                        }
                        else {
                            if (useLogs) {
                                console.log("there was a cache but expired ttl");
                            }
                            delete cacheUris.current[REQUEST_URI];
                        }
                    }
                    return [4 /*yield*/, fetch("".concat(REQUEST_URI, "?") + new URLSearchParams(props === null || props === void 0 ? void 0 : props.params), __assign(__assign({}, args), { body: contentType === "application/json"
                                ? JSON.stringify(props === null || props === void 0 ? void 0 : props.body)
                                : props === null || props === void 0 ? void 0 : props.body }))];
                case 2:
                    response = _c.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    x = _c.sent();
                    if (response.ok) {
                        setData(x);
                        if (useCache) {
                            cacheUris.current = __assign(__assign({}, cacheUris.current), (_a = {}, _a[REQUEST_URI] = {
                                response: x,
                                ttl: new Date().getTime() + ttlCache,
                            }, _a));
                        }
                    }
                    else {
                        setError(Object.keys(x).length > 0 ? x : "Error");
                        if (globalError) {
                            globalError(x);
                        }
                        if (useErrorView) {
                            openErrorView(true);
                        }
                    }
                    setLoading(false);
                    return [3 /*break*/, 6];
                case 4:
                    e_1 = _c.sent();
                    setError(e_1);
                    if (globalError) {
                        globalError(e_1);
                    }
                    if (useErrorView) {
                        openErrorView(true);
                    }
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var destroy = function () {
        setData(undefined);
        setError(undefined);
    };
    return {
        sendRequest: sendRequest,
        data: data,
        error: error,
        isLoading: isLoading,
        destroy: destroy,
    };
};
//# sourceMappingURL=useFetch.js.map