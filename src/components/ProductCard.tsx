import Link from "next/link";
import React from "react";

interface Product {
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

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
        {/* Product image/icon */}
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-50 text-3xl">
            {product.image}
          </div>

          {/* Product name + unit */}
          <div>
            <h2 className="text-lg font-bold">{product.nameBn}</h2>

            <p className="text-sm text-gray-500">
              প্রতি {product.unit}
            </p>
          </div>
        </div>

        {/* Price section */}
        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-sm text-gray-500">আজকের দাম</p>

            <p className="text-2xl font-bold">
              ৳{product.today}
            </p>
          </div>

          {/* Price change */}
          <div
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              product.change.dir === "up"
                ? "bg-red-50 text-red-500"
                : "bg-green-50 text-green-500"
            }`}
          >
            {product.change.dir === "up" ? "▲" : "▼"}{" "}
            {product.change.pct}%
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;