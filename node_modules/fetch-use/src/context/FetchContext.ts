import { createContext, useContext } from "react";

export type FetchContextType = {
  baseUrl: string;
  isError: boolean;
  cacheUris: Record<string, any>;
  globalError?: (opt:{message: string, response?: any}) => void;
  setError: (isError: boolean) => void;
};
export const FetchContext = createContext<FetchContextType>({
  baseUrl: "",
  isError: false,
  cacheUris: {},
  setError: () => console.error("no error provider"),
});
export const useFetchWrapper = () => useContext(FetchContext);
