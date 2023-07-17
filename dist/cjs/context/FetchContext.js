"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFetchWrapper = exports.FetchContext = void 0;
var react_1 = require("react");
exports.FetchContext = (0, react_1.createContext)({
    baseUrl: "",
    isError: false,
    cacheUris: {},
    setError: function () { return console.error("no error provider"); },
});
var useFetchWrapper = function () { return (0, react_1.useContext)(exports.FetchContext); };
exports.useFetchWrapper = useFetchWrapper;
//# sourceMappingURL=FetchContext.js.map