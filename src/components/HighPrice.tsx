import React from "react";
import ProductCard from "./ProductCard";

export interface Tproduct {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

const HighPrice = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const result = await res.json();

  // API direct array অথবা { data: [...] } দিতে পারে
  const products: Tproduct[] = Array.isArray(result)
    ? result
    : result.data;

  const top6Products = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <div className="container mx-auto mt-9 px-4">
      <div className="flex items-center gap-2">
        <h1 className="text-red-500">▲</h1>
        <h1 className="text-2xl font-bold">আজ দাম বেড়েছে</h1>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {top6Products.map((tProduct) => (
          <ProductCard key={tProduct.id} product={tProduct} />
        ))}
      </div>
    </div>
  );
};

export default HighPrice;