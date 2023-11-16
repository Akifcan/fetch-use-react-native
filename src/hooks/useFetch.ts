import { useRef, useState } from "react";
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
  const controller = useRef<AbortController>(new AbortController());
  // 300000 IS 5 MINUTE
  const [data, setData] = useState<T>();
  const [error, setError] = useState<{ message: string; response?: any }>();
  const [isLoading, setLoading] = useState(false);
  const {
    setError: openErrorView,
    baseUrl: API_URL,
    cacheUris,
    globalError,
  } = useFetchWrapper();

  const sendRequest = async (props?: {
    body?: Record<string, any>;
    params?: Record<string, any>;
    contentType?: "application/json" | "multipart/form-data";
    timeoutTtl?: {
      duration?: number;
      onExpired?: () => void;
    };
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
            console.log("\x1b[33m fetch-use: return cacheval!\x1b[0m");
          }
          setTimeout(() => {
            setData(res.response);
          }, 0);
          return setLoading(false);
        } else {
          if (useLogs) {
            console.log(
              "\x1b[33m fetch-use: there was a cache but expired ttl \x1b[0m"
            );
          }
          delete cacheUris.current[REQUEST_URI];
        }
      }
      const signal = controller.current.signal;

      if (props?.timeoutTtl) {
        setTimeout(() => {
          if (props.timeoutTtl?.onExpired) {
            props.timeoutTtl?.onExpired();
          }
          if (useLogs) {
            console.log("\x1b[33m fetch-use: this request is aborted \x1b[0m");
          }
          controller.current.abort();
        }, props.timeoutTtl?.duration || 30000);
      }

      const response = await fetch(
        `${REQUEST_URI}?` + new URLSearchParams(props?.params),
        {
          ...args,
          body:
            contentType === "application/json"
              ? JSON.stringify(props?.body)
              : (props?.body as any),
          signal,
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
        setError({
          response: response,
          message: Object.keys(x).length > 0 ? x : "Error",
        });
        if (globalError) {
          globalError({
            message: Object.keys(x).length > 0 ? x : "Error",
            response,
          });
        }
        if (useErrorView) {
          openErrorView!(true);
        }
      }
      setLoading(false);
    } catch (e: any) {
      setError({ message: e ? e.toString() : 'unexcepted_error' });
      if (globalError) {
        globalError({
          message: e ? e.toString() : 'unexcepted_error',
          response: { name: e.name, type: e.type, code: e.code },
        });
      }
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
    abortController: controller,
  };
};
