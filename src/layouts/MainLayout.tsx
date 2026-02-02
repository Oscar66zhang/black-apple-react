import type { ReactNode } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { Skeleton } from "@/components/Skeleton";

const MainLayout = ({
  header,
  footer,
}: {
  header?: ReactNode;
  footer?: ReactNode;
}) => {
  const navigation = useNavigation();
  return (
    <div className="bg-apple-light dark:bg-apple-dark">
      {header ?? <h1>默认标题</h1>}
      <div className="min-h-screen bg-apple-white dark:bg-apple-dark text-apple-text">
        {navigation.state === "loading" ? <Skeleton /> : <Outlet />}
      </div>
      {footer ?? <p>默认页脚</p>}
    </div>
  );
};

export default MainLayout;
