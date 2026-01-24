import React from "react";

const ReleaseNote = () => (
  <div>
    <h1>新产品发布日期：2199年1月1日</h1>
    <h2>请耐心等待</h2>
  </div>
);

const ProductNotFound = () => (
  <div>
    <h1>产品未发布</h1>
    <h2>请耐心等待</h2>
  </div>
);

const ListTitle = ({ title }: { title: string }) => (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <h1
      style={{
        fontSize: 32,
        fontWeight: "800",
        backgroundImage: "url('src/assets/lines.png')",
        backgroundPosition: "center",
      }}
      className="dark:text-white"
    >
      {title || "新品上市"}
    </h1>
  </div>
);

type ProductListProps = {
  title?: string;
  datalength: number;
  children: React.ReactNode;
};

const ProductList = ({ title, datalength, children }: ProductListProps) => {
  const isReleased = new Date() <= new Date("2199-01-01");

  if (!isReleased) {
    return <ReleaseNote />;
  }

  if (datalength <= 0) {
    return <ProductNotFound />;
  }

  return (
    <div
      style={{
        marginTop: "4rem",
        display: "grid",
        justifyItems: "center",
        rowGap: "3rem",
      }}
    >
      <ListTitle title={title || ""} />
      {children}
    </div>
  );
};

export default ProductList;
