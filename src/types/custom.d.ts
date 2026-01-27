// 定义模型信息
export interface ProductModel {
  id: string | number;
  name: string;
  specification: string;
  price: number;
}

// 定义 MemorySize 类型
export interface MemorySize {
  id: string | number;
  name: string;
  price: number;
}

export type Color = "沙漠色钛金属" | "原色钛金属" | "白色钛金属" | "黑色钛金属";

// 定义 Phone 产品的类型
export interface Product {
  id: number;
  name: string;
  title: string;
  image: string;
  carouselImages: string[];
  startingPrice: number;
  installments: number;
  models: ProductModel[];
  colors: Color[];
  memorySizes: MemorySize[];
  features: string[];
  inStock: boolean;
  category?: string;
}

export type ShoppingCart = {
  id: number;
  items: CartItem[];
  createdAt: string;
  total: number;
};

export interface Order {
  id: number;
  userId: string;
  state: "Processing" | "Completed" | "Pending" | "Cancelled"; // 可以根据实际状态扩展
  createDateUTC: string; // ISO 字符串，也可以用 Date 类型
  paymentUri: string;
  transactionMetadata: string | null;
  orderItems: CartItem[];
}

export interface CartItem {
  productId: string | number;
  name: string;
  imageSrc: string;
  modelId: string | number | null;
  model: string | null;
  modelPrice: number | null;
  color: string | null;
  memorySizeId: string | number | null;
  memorySize: string | null;
  memorySizePrice: number | null;
  qty: number | null;
}

export interface SupportData {
  data: string;
}

export interface Video {
  id: number;
  regularSrc: string;
  smallSrc: string;
}

export interface Feature {
  id: number;
  title: string;
  detail: string;
  image: string;
  textColor: string;
}

export interface ProductInCategory {
  id: number;
  name: string;
  title: string;
  image: string;
  startingPrice: number;
  installments: number;
  features: string[];
}

export interface Category {
  id: number;
  title: string;
  subTitle: string;
  videos: Video;
  features: Feature[];
  products: Product[];
}
