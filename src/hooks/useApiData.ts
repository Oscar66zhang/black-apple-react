import { useState, useEffect } from "react";

const useApiData = <T>(apiUrl: string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (signal: AbortSignal) => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(apiUrl, { signal })
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const result: T = await response.json();
            console.log("加载数据:", result);
            setData(result);
        } catch (error) {
            console.error("加载数据失败:", error);
            setError(error instanceof Error ? error.message : "加载数据失败");
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // 1. 创建 AbortController 实例（浏览器原生 API）
        const controller = new AbortController();
        // 2. 获取控制器的信号对象（用于关联请求和控制器）
        const { signal } = controller;
        // 3. 调用封装的 fetchData 函数，传入信号对象，发起请求
        fetchData(signal);
        // 4. 返回清理函数（useEffect 的核心特性）
        return () => {
            // 取消未完成的网络请求
            controller.abort();
            console.log("useEffect 清理");
        };
    }, [apiUrl]); // 依赖项：只有 apiUrl 变化时，才重新执行这个 useEffect

    return {
        data,
        loading,
        error
    }
}

export default useApiData;