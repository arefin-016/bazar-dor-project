import React from 'react';
import MarqueeText from 'react-marquee-text';

const Marquee = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products"
  );

  const data = await res.json();

  return (
    <div className="mt-4 overflow-hidden">
      <MarqueeText direction="right" duration={10}>
        <div className="flex gap-3 mt-6">
          {data.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="flex shrink-0 items-center gap-2 border border-gray-200 bg-base-100 p-3"
            >
              {/* Icon */}
              <span>{product.categoryIcon}</span>

              {/* Product name */}
              <span>{product.nameBn}</span>

              {/* Price */}
              <span>
                {product.today} টাকা/{product.unit}
              </span>

              {/* Price change */}
              <span
                className={
                  product.change.dir === "up"
                    ? "text-red-500"
                    : "text-green-500"
                }
              >
                {product.change.dir === "up" ? "▲" : "▼"}{" "}
                {product.change.pct}%
              </span>
            </div>
          ))}
        </div>
      </MarqueeText>
    </div>
  );
};

export default Marquee;