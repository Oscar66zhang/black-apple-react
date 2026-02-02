import React from "react";

export const Skeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-apple-gray-200 dark:bg-apple-dark flex items-center justify-center p-8">
      <div className="w-full max-w-2xl space-y-6">
        {/* 大标题骨架 */}
        <div className="h-10 bg-apple-gray-800 dark:bg-apple-gray-300 rounded-xl animate-pulse"></div>

        {/* 图片骨架 */}
        <div className="w-full h-64 bg-apple-gray-800 dark:bg-apple-gray-300 rounded-2xl animate-pulse"></div>

        {/* 三段文字骨架 */}
        <div className="space-y-4">
          <div className="h-6 bg-apple-gray-800 dark:bg-apple-gray-300 rounded-lg animate-pulse"></div>
          <div className="h-6 bg-apple-gray-800 dark:bg-apple-gray-300 rounded-lg animate-pulse w-3/4"></div>
          <div className="h-6 bg-apple-gray-800 dark:bg-apple-gray-300 rounded-lg animate-pulse w-1/2"></div>
        </div>

        {/* 按钮骨架 */}
        <div className="h-12 bg-apple-gray-800 dark:bg-apple-gray-300 rounded-full animate-pulse w-1/3"></div>
      </div>
    </div>
  );
};
