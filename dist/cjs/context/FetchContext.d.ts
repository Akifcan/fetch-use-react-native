/// <reference types="react" />
export type FetchContextType = {
    baseUrl: string;
    isError: boolean;
    cacheUris: Record<string, any>;
    globalError?: (errorData: any) => void;
    setError: (isError: boolean) => void;
    restartApp: () => void;
};
export declare const FetchContext: import("react").Context<FetchContextType>;
export declare const useFetchWrapper: () => FetchContextType;
