const NotFound = () => (
  <div className="flex min-h-screen items-center justify-center bg-white dark:bg-apple-dark">
    <div className="flex flex-col items-center text-center">
      <div className="mb-8 flex flex-col items-center">
        {/* 错误代码 - 使用苹果大标题风格 */}
        <h1 className="text-9xl font-semibold tracking-tighter text-gray-900 dark:text-apple-text-dark">
          404
        </h1>

        {/* 主提示文字 - 类似苹果的Large Title样式 */}
        <h2 className="mt-4 text-3xl font-medium text-gray-900 dark:text-apple-text-dark">
          页面不存在
        </h2>

        {/* 辅助说明文字 - 类似苹果的Body样式 */}
        <p className="mt-2 text-lg text-gray-600 dark:text-apple-text-dark">
          您访问的页面可能已经移动或删除
        </p>
      </div>

      {/* 返回按钮 - 模仿苹果的引导操作样式 */}
      <a
        href="/"
        className="mt-6 rounded-lg px-6 py-3 text-lg font-medium text-gray-900 dark:text-apple-text-dark transition-all 
                     hover:bg-gray-100 hover:opacity-90 focus:outline-none focus:ring-2 
                     focus:ring-gray-400 focus:ring-offset-2"
      >
        返回首页
      </a>
    </div>
  </div>
);

export default NotFound;
