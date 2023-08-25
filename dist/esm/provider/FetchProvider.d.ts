import { FC, ReactNode } from "react";
interface FetchProviderProps {
    children: ReactNode;
    errorView: ReactNode;
    globalError?: (opt: {
        message: string;
        response?: any;
    }) => void;
    baseUrl: string;
}
export declare const FetchProvider: FC<FetchProviderProps>;
export {};
