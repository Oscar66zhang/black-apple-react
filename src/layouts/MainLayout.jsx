import React from "react";

const MainLayout = ({ header, content, footer }) => {
  return (
    <div className="bg-apple-light dark:bg-apple-dark">
      {header ?? <h1>默认标题</h1>}
      {content ?? <p>默认内容</p>}
      {footer ?? <p>默认页脚</p>}
    </div>
  );
};

export default MainLayout;
