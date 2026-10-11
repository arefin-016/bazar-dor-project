import React from "react";
import ProductCard from "./ProductCard";
import type { Tproduct } from "./HighPrice";

const LowPrice = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const result = await res.json();

  const data: Tproduct[] = Array.isArray(result)
    ? result
    : result.data;

  const top6Products = data
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="container mx-auto mt-9 px-4">
      <div className="flex items-center gap-2">
        <h1 className="text-green-500">▼</h1>
        <h1 className="text-2xl font-bold">আজ দাম কমেছে</h1>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {top6Products.map((tProduct) => (
          <ProductCard key={tProduct.id} product={tProduct} />
        ))}
      </div>
    </div>
  );
};

export default LowPrice;
