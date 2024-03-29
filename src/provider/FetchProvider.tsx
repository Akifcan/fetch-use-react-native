import React, { FC, ReactNode, useState, useRef } from "react";
import { FetchContext } from "../context/FetchContext";

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

export const FetchProvider: FC<FetchProviderProps> = ({
  children,
  baseUrl,
  errorView,
  globalError,
}) => {
  const [isError, setError] = useState(false);

  const cacheUris = useRef({});

  return (
    <FetchContext.Provider
      value={{ isError, setError, baseUrl, cacheUris: cacheUris, globalError }}
    >
      {!isError ? children : errorView}
    </FetchContext.Provider>
  );
};
