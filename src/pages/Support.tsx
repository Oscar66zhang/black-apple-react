import { useEffect, useState } from "react";
import { Skeleton } from "@/components";
import { SupportData } from "@/types/custom";
import useApiData from "@/hooks/useApiData";
import { div } from "framer-motion/client";

const Support = () => {
  const { data, loading, error } = useApiData(
    "http://152.136.182.210:12231/api/information/support",
  );
  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p>加载数据失败: {error}</p>
      </div>
    );
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
