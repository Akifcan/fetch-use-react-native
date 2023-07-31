import React, { useState, useRef } from "react";
import { FetchContext } from "../context/FetchContext";
export var FetchProvider = function (_a) {
    var children = _a.children, baseUrl = _a.baseUrl, errorView = _a.errorView, globalError = _a.globalError;
    var _b = useState(false), isError = _b[0], setError = _b[1];
    var cacheUris = useRef({});
    return (React.createElement(FetchContext.Provider, { value: { isError: isError, setError: setError, baseUrl: baseUrl, cacheUris: cacheUris, globalError: globalError } }, !isError ? children : errorView));
};
//# sourceMappingURL=FetchProvider.js.map