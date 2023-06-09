export declare class UseFetchConst {
    static headers: Record<string, any>;
}
export declare const useFetch: <T>(uri: string, method: "POST" | "GET" | "PUT" | "PATH" | "DELETE", options: {
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
    }) => Promise<void>;
    data: T | undefined;
    error: string | undefined;
    isLoading: boolean;
    destroy: () => void;
};
