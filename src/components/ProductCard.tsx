import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">

      {/* Top section */}
      <div className="flex items-center gap-4">

        {/* Product image/icon */}
        <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center text-3xl">
          {product.image}
        </div>

        {/* Name + unit */}
        <div>
          <h2 className="font-bold text-lg">
            {product.nameBn}
          </h2>

          <p className="text-sm text-gray-500">
            প্রতি {product.unit}
          </p>
        </div>

      </div>

      {/* Price section */}
      <div className="flex justify-between items-end mt-5">

        <div>
          <p className="text-sm text-gray-500">
            আজকের দাম
          </p>

          <p className="text-2xl font-bold">
            ৳{product.today}
          </p>
        </div>

        {/* Price change */}
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium ${
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
  );
};

export default ProductCard;