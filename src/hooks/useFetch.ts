import { useState } from "react";
import { useFetchWrapper } from "../context/FetchContext";

export class UseFetchConst {
  static headers: Record<string, any> = {};
}

export const useFetch = <T>(
  uri: string,
  method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE",
  options: {
    headers?: Record<string, any>;
    useErrorView?: boolean;
    useCache?: boolean;
    ttlCache?: number;
    useLogs?: boolean;
  }
) => {
  const {
    headers = {},
    useErrorView = true,
    useCache = false,
    ttlCache = 300000,
    useLogs = false,
  } = options;
  // 300000 IS 5 MINUTE
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>();
  const [isLoading, setLoading] = useState(false);
  const {
    setError: openErrorView,
    baseUrl: API_URL,
    cacheUris,
  } = useFetchWrapper();

  const sendRequest = async (props?: {
    body?: Record<string, any>;
    params?: Record<string, any>;
    contentType?: "application/json" | "multipart/form-data";
  }) => {
    if (method === "GET" && props?.body !== undefined) {
      throw new Error("you should remove body if request is get");
    }
    try {
      const contentType = props?.contentType ?? "application/json";
      setLoading(true);
      const args = {
        method,
        headers: {
          "content-type": contentType,
          ...headers,
          ...UseFetchConst.headers,
        },
      };

      setData(undefined);
      const REQUEST_URI = `${API_URL}${uri}`;
      if (useCache === true && cacheUris.current[REQUEST_URI]) {
        const res = cacheUris.current[REQUEST_URI];
        const now = new Date().getTime();
        if (now < res.ttl) {
          if (useLogs) {
            console.log("return cacheval!");
          }
          setTimeout(() => {
            setData(res.response);
          }, 0);
          return setLoading(false);
        } else {
          if (useLogs) {
            console.log("there was a cache but expired ttl");
          }
          delete cacheUris.current[REQUEST_URI];
        }
      }

      const response = await fetch(
        `${REQUEST_URI}?` + new URLSearchParams(props?.params),
        {
          ...args,
          body:
            contentType === "application/json"
              ? JSON.stringify(props?.body)
              : (props?.body as any),
        }
      );
      const x = await response.json();
      if (response.ok) {
        setData(x);
        if (useCache) {
          cacheUris.current = {
            ...cacheUris.current,
            [REQUEST_URI]: {
              response: x,
              ttl: new Date().getTime() + ttlCache,
            },
          };
        }
      } else {
        setError(Object.keys(x).length > 0 ? x : "Error");
        if (useErrorView) {
          openErrorView!(true);
        }
      }
      setLoading(false);
    } catch (e: any) {
      setError(e);

      if (useErrorView) {
        openErrorView!(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const destroy = () => {
    setData(undefined);
    setError(undefined);
  };

  return {
    sendRequest,
    data,
    error,
    isLoading,
    destroy,
  };
};
