import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Product } from "@/types/custom";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  const page = parseInt(searchParams.get("page") || "1"); //获取页码，默认为1;

  const handlePageChange = (newPage: number) => {
    setSearchParams({ query: query || "", page: newPage.toString() });
  };

  const [searchResults, setSearchResults] = useState<Product[]>([]);

  useEffect(() => {
    //副作用逻辑
    fetch(`http://localhost:5293/api/products?keyword=${query}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setSearchResults(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setSearchResults([]);
      });
  }, [query]); //依赖数组
  //空数组：[]:只在组件挂载 [mount] 时执行一次
  //有依赖：依赖变化时重新执行
  //不写依赖：每次渲染都会执行 (不推荐，容易浪费性能)

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      <p className="text-gray-600">
        搜索关键词
        {query ? `"${query}"` : "未指定"}
      </p>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((product) => (
            <li key={product.id} className="mb-2">
              <h2 className="text-lg font-semibold">
                {product.name}-{product.startingPrice}
              </h2>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">暂无搜索结果</p>
      )}
      <button onClick={() => handlePageChange(page - 1)}>上一页</button>
      <button onClick={() => handlePageChange(page + 1)}>下一页</button>
    </div>
  );
};

export default SearchResults;
