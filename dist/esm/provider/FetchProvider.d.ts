import { FC, ReactNode } from "react";
interface FetchProviderProps {
    children: ReactNode;
    errorView: ReactNode;
    baseUrl: string;
}
export declare const FetchProvider: FC<FetchProviderProps>;
export {};
