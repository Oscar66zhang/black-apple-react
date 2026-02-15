import { useEffect, useState } from "react";
import { Skeleton } from "@/components";
import { SupportData } from "@/types/custom";

const Support = () => {
  const [data, setData] = useState<SupportData | null>(null);
  const [loading, setLoading] = useState(true);
  const loadData = async (signal: AbortSignal) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://152.136.182.210:12231/api/information/support`,
        { signal },
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("加载数据:", result);
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error("加载数据失败:", error);
      setData(null);
      setLoading(false);
    }
  };

  console.log("组件渲染");
  useEffect(() => {
    console.log("useEffect 执行");
    const controller = new AbortController();
    const { signal } = controller;
    loadData(signal);
    return () => {
      controller.abort();
      console.log("useEffect 清理");
    };
  }, []);

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className="min-h-screen text-apple-text dark:text-apple-text-dark">
      <div
        className="p-4 text-xs text-gray-500"
        dangerouslySetInnerHTML={{ __html: data?.data || "" }}
      ></div>
    </div>
  );
};

export default Support;
