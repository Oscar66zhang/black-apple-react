import { useState, useEffect, useRef, use } from "react";

interface UseApiOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: any;
    headers?: Record<string, string>;
    autoFetch?: boolean; //是否在mount时自动请求
}


type ExtraOptions = {
    overrideUrl?: string;
    overrideMethod?: "GET" | "POST" | "PUT" | "DELETE";
    overrideHeaders?: Record<string, string>;
    overrideBody?: any;
}

const useApiData = <T>(apiUrl: string, options: UseApiOptions = {}) => {
    const {
        method = "GET",
        body = null, headers = {},
        autoFetch = true
    } = options;

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const abortControllerRef = useRef<AbortController | null>(null);

    const fetchData = async (extraOptions: ExtraOptions = {}) => {
        try {
            setLoading(true);
            const controller = new AbortController();
            abortControllerRef.current = controller;

            const response = await fetch(extraOptions?.overrideUrl
                || apiUrl, {
                method: extraOptions?.overrideMethod || method,
                headers: {
                    ...headers,
                    ...extraOptions?.overrideHeaders,
                },
                body: (extraOptions?.overrideMethod || method) !== "GET"
                    ? JSON.stringify(extraOptions?.overrideBody || body) : undefined,
                signal: controller.signal
            })
            //如果返回401，拦截并处理
            if (response.status === 401) {
                console.warn("401 未授权，可能需要重新登录");
                localStorage.removeItem("token");
                window.location.href = "/auth/signin";
                return;
            }

            const result: T = await response.json();
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            setData(result);
            setError(null);
        } catch (error) {
            console.error("加载数据失败:", error);
            setError(error instanceof Error ? error.message : "加载数据失败");
            setData(null);
        } finally {
            setLoading(false);
            abortControllerRef.current = null;
        }
    };

    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        }
    }, [])

    useEffect(() => {
        if (!autoFetch) {
            return;
        }

        // 3. 调用封装的 fetchData 函数，传入信号对象，发起请求
        fetchData();
        // 4. 返回清理函数（useEffect 的核心特性）
        return () => {
            console.log("useEffect 清理");
        };
    }, [apiUrl]); // 依赖项：只有 apiUrl 变化时，才重新执行这个 useEffect

    return {
        data,
        loading,
        error,
        fetchData,
    }
}

export default useApiData;