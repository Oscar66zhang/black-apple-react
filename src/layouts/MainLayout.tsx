import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = ({
  header,
  footer,
}: {
  header?: ReactNode;
  footer?: ReactNode;
}) => {
  return (
    <div className="bg-apple-light dark:bg-apple-dark">
      {header ?? <h1>默认标题</h1>}
      <Outlet />
      {footer ?? <p>默认页脚</p>}
    </div>
  );
};

export default MainLayout;
