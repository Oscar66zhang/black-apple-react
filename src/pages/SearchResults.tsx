import { useSearchParams, useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import type { Product } from "@/types/custom";
import { useDebounce } from "@/helpers/useDebounce";
import Button from "@/components/Button";
import SearchResultCard from "@/components/SearchResultCard";
import { ShoppingCartContext } from "@/contexts/shoppingCart";
import FilterButton from "@/components/FilterButton";

const filters = ["全部", "电脑", "手机", "平板", "其他"];

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");

  const debouncedQuery = useDebounce(query || "", 500);

  const page = parseInt(searchParams.get("page") || "1"); //获取页码，默认为1;

  const handlePageChange = (newPage: number) => {
    setSearchParams({ query: query || "", page: newPage.toString() });
  };

  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const search = async (signal: AbortSignal) => {
    try {
      const response = await fetch(
        `http://152.136.182.210:12231/api/products?keyword=${debouncedQuery}`,
        { signal },
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error: any) {
      if (error.name === "AbortError") {
        return;
      }
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    //副作用逻辑
    const controller = new AbortController();
    //创建一个新的 AbortController 实例，用于取消请求
    const signal = controller.signal;
    search(signal);
    return () => {
      controller.abort();
    };
  }, [debouncedQuery]); //依赖数组
  //空数组：[]:只在组件挂载 [mount] 时执行一次
  //有依赖：依赖变化时重新执行
  //不写依赖：每次渲染都会执行 (不推荐，容易浪费性能)

  useEffect(() => {
    let timer = setInterval(() => {
      console.log("每隔一秒执行一次的逻辑");
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [query]); //依赖数组

  const { addToCart } = useContext(ShoppingCartContext);
  const handleAddToCart = useCallback((product: Product) => {
    const cartItem = {
      productId: product.id,
      name: product.name,
      imageSrc: product.image,
      modelId: product.models[0].id,
      model: product.models[0].name,
      modelPrice: product.models[0].price,
      memorySizeId: product.memorySizes[0].id,
      memorySize: product.memorySizes[0].name,
      memorySizePrice: product.memorySizes[0].price,
      color: product.colors[0],
      price:
        product.startingPrice +
        product.models[0].price +
        product.memorySizes[0].price,
      qty: 1,
    };
    addToCart(cartItem);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>("全部");

  const filteredProducts = searchResults.filter((product) => {
    const matchesCategory =
      selectedCategory === "全部" || product.category === selectedCategory;
    console.log("过滤后的产品:", product);
    return matchesCategory;
  });

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto mb-12">
        <input
          title="搜索关键词"
          type="text"
          value={query || ""}
          onChange={(e) => {
            setSearchParams({ query: e.target.value, page: "1" });
          }}
          placeholder="输入搜索关键词"
          className="w-full px-6 py-4 bg-apple-white dark:bg-apple-dark rounded-xl text-lg
            border border-apple-gray dark:border-apple-dark-gray
            focus:outline-none focus:ring-1 focus:ring-apple-blue dark:focus:ring-apple
            transition-all
          "
        />
        <p className="mt-6">搜索关键词：{query}</p>
      </div>

      <div className="max-w-4xl mx-auto mb-8 flex gap-4">
        {filters.map((filter) => (
          <FilterButton
            key={filter}
            filter={filter}
            isSelected={false}
            onClick={() => {
              setSelectedCategory(filter);
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProducts.map((product) => (
          <SearchResultCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
      <div className="flex items-center justify-center mt-8 gap-6">
        <h2 className="text-xl font-medium text-apple-text dark:text-apple-text-dark">
          当前第<span className="font-semibold">{page}</span>页
        </h2>
        <Button title="上一页" onClick={() => handlePageChange(page - 1)} />
        <Button title="下一页" onClick={() => handlePageChange(page + 1)} />
      </div>
    </div>
  );
};

export default SearchResults;
