"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFetchWrapper = exports.UseFetchConst = exports.useFetch = exports.FetchProvider = void 0;
var FetchProvider_1 = require("./provider/FetchProvider");
Object.defineProperty(exports, "FetchProvider", { enumerable: true, get: function () { return FetchProvider_1.FetchProvider; } });
var useFetch_1 = require("./hooks/useFetch");
Object.defineProperty(exports, "useFetch", { enumerable: true, get: function () { return useFetch_1.useFetch; } });
Object.defineProperty(exports, "UseFetchConst", { enumerable: true, get: function () { return useFetch_1.UseFetchConst; } });
var FetchContext_1 = require("./context/FetchContext");
Object.defineProperty(exports, "useFetchWrapper", { enumerable: true, get: function () { return FetchContext_1.useFetchWrapper; } });
//# sourceMappingURL=index.js.map