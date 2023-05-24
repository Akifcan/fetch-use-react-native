"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchProvider = void 0;
var react_1 = __importStar(require("react"));
var FetchContext_1 = require("../context/FetchContext");
var FetchProvider = function (_a) {
    var children = _a.children, baseUrl = _a.baseUrl, errorView = _a.errorView;
    var _b = (0, react_1.useState)(false), isError = _b[0], setError = _b[1];
    var cacheUris = (0, react_1.useRef)({});
    return (react_1.default.createElement(FetchContext_1.FetchContext.Provider, { value: { isError: isError, setError: setError, baseUrl: baseUrl, cacheUris: cacheUris } }, !isError ? children : errorView));
};
exports.FetchProvider = FetchProvider;
//# sourceMappingURL=FetchProvider.js.map