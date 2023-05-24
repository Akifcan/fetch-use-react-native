import React, { FC, ReactNode, useState, useRef } from "react";
import { FetchContext } from "../context/FetchContext";

interface FetchProviderProps {
  children: ReactNode;
  errorView: ReactNode;
  baseUrl: string;
}

export const FetchProvider: FC<FetchProviderProps> = ({
  children,
  baseUrl,
  errorView,
}) => {
  const [isError, setError] = useState(false);

  const cacheUris = useRef({});

  return (
    <FetchContext.Provider
      value={{ isError, setError, baseUrl, cacheUris: cacheUris }}
    >
      {!isError ? children : errorView}
    </FetchContext.Provider>
  );
};
