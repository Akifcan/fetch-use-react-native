import { FC, ReactNode } from "react";
interface FetchProviderProps {
    children: ReactNode;
    errorView: ReactNode;
    globalError?: (opt: {
        message: string;
        response?: any;
        endpoint?: string;
    }) => void;
    baseUrl: string;
}
export declare const FetchProvider: FC<FetchProviderProps>;
export {};
