/// <reference types="react" />
export declare class UseFetchConst {
    static headers: Record<string, any>;
}
export declare const useFetch: <T>(uri: string, method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE", options: {
    headers?: Record<string, any> | undefined;
    useErrorView?: boolean | undefined;
    useCache?: boolean | undefined;
    ttlCache?: number | undefined;
    useLogs?: boolean | undefined;
}) => {
    sendRequest: (props?: {
        body?: Record<string, any>;
        params?: Record<string, any>;
        contentType?: "application/json" | "multipart/form-data";
        timeoutTtl?: {
            duration?: number;
            onExpired?: () => void;
        };
    }) => Promise<void>;
    data: T | undefined;
    error: {
        message: string;
        response?: any;
    } | undefined;
    isLoading: boolean;
    destroy: () => void;
    abortController: import("react").MutableRefObject<AbortController>;
};
