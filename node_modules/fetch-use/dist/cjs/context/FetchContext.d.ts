/// <reference types="react" />
export type FetchContextType = {
    baseUrl: string;
    isError: boolean;
    cacheUris: Record<string, any>;
    globalError?: (opt: {
        message: string;
        response?: any;
    }) => void;
    setError: (isError: boolean) => void;
};
export declare const FetchContext: import("react").Context<FetchContextType>;
export declare const useFetchWrapper: () => FetchContextType;
