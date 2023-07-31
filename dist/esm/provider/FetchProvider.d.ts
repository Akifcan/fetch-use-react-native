import { FC, ReactNode } from "react";
interface FetchProviderProps {
    children: ReactNode;
    errorView: ReactNode;
    globalError?: (errorData: any) => void;
    baseUrl: string;
}
export declare const FetchProvider: FC<FetchProviderProps>;
export {};
