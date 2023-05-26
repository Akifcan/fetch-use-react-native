import { createContext, useContext } from "react";
export var FetchContext = createContext({
    baseUrl: "",
    isError: false,
    cacheUris: {},
    setError: function () { return console.error("no error provider"); }
});
export var useFetchWrapper = function () { return useContext(FetchContext); };
//# sourceMappingURL=FetchContext.js.map