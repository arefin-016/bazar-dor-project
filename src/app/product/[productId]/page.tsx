import React from "react";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

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
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: Market[];
}

const DetilsPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;

  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products/${productId}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Product not found");
  }

  const response = await res.json();

  const data: Product = response.data ?? response;

  const averagePrice = Math.round(
    data.markets.reduce(
      (total, market) => total + (market.min + market.max) / 2,
      0
    ) / data.markets.length
  );

  const lowestMarket = data.markets.reduce((a, b) =>
    a.min < b.min ? a : b
  );

  const highestMarket = data.markets.reduce((a, b) =>
    a.max > b.max ? a : b
  );

  const priceDifference = data.today - data.yesterday;

  return (
    <main className="min-h-screen bg-[#f0f6f1] px-4 py-6 md:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <span>হোম</span>
          <span>›</span>
          <span>{data.categoryNameBn}</span>
          <span>›</span>
          <span className="text-gray-900">{data.nameBn}</span>
        </div>

        {/* Product Header */}
        <section className="mb-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-6">
          <div className="flex items-center justify-between gap-3">

            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f0f6f1] text-3xl">
                {data.image || data.categoryIcon}
              </div>

              <div>
                <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
                  {data.nameBn}
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  {data.categoryNameBn} · প্রতি {data.unit === "kg" ? "কেজি" : data.unit}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  বাংলাদেশের বিভিন্ন বাজারের দাম
                </p>
              </div>
            </div>

            {/* Today's Price */}
            <div className="shrink-0 rounded-xl bg-[#f5f8f5] px-4 py-3 text-center">
              <p className="text-xs text-gray-500">আজকের দাম</p>

              <h2 className="my-1 text-2xl font-bold text-gray-900">
                {data.today}
              </h2>

              <p className="text-xs text-gray-500">
                টাকা / {data.unit === "kg" ? "কেজি" : data.unit}
              </p>

              <p
                className={`mt-1 text-xs font-semibold ${
                  priceDifference > 0
                    ? "text-red-500"
                    : priceDifference < 0
                      ? "text-green-600"
                      : "text-gray-500"
                }`}
              >
                {priceDifference > 0
                  ? "▲"
                  : priceDifference < 0
                    ? "▼"
                    : "●"}{" "}
                {Math.abs(priceDifference)} টাকা
              </p>
            </div>

          </div>
        </section>

        {/* Price Summary */}
        <section className="mb-4 rounded-2xl border border-gray-100 bg-white p-4 md:p-5">

          <h2 className="mb-4 font-bold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

            {/* Lowest */}
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-2 text-xl font-bold text-green-600">
                {lowestMarket.min} টাকা
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {lowestMarket.market}
              </p>
            </div>

            {/* Highest */}
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500">
                সর্বোচ্চ দাম
              </p>

              <p className="mt-2 text-xl font-bold text-red-500">
                {highestMarket.max} টাকা
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {highestMarket.market}
              </p>
            </div>

            {/* Average */}
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500">
                গড় দাম
              </p>

              <p className="mt-2 text-xl font-bold text-green-600">
                {averagePrice} টাকা
              </p>

              <p className="mt-1 text-xs text-gray-500">
                সব বাজারের গড় দাম
              </p>
            </div>

          </div>

          {/* Market Table */}
          <h2 className="mb-4 mt-6 font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto rounded-lg">
            <table className="w-full border-collapse text-sm">

              <thead>
                <tr className="border-y border-gray-300 bg-[#f8faf8] text-left text-gray-600">
                  <th className="whitespace-nowrap px-3 py-3 font-medium">
                    বাজার
                  </th>

                  <th className="whitespace-nowrap px-3 py-3 font-medium">
                    বিভাগ
                  </th>

                  <th className="whitespace-nowrap px-3 py-3 text-right font-medium">
                    সর্বনিম্ন
                  </th>

                  <th className="whitespace-nowrap px-3 py-3 text-right font-medium">
                    সর্বোচ্চ
                  </th>

                  <th className="whitespace-nowrap px-3 py-3 text-right font-medium">
                    গড়
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.markets.map((market, index) => (
                  <tr
                    key={`${market.market}-${index}`}
                    className={`border-b border-gray-300 ${
                      index % 2 === 0
                        ? "bg-white"
                        : "bg-[#f0f6f1]"
                    } hover:bg-green-50`}
                  >
                    <td className="whitespace-nowrap px-3 py-3 text-gray-800">
                      {market.market}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-gray-700">
                      {market.division}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-right text-gray-800">
                      {market.min} টাকা
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-right text-gray-800">
                      {market.max} টাকা
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-right font-medium text-gray-800">
                      {Math.round((market.min + market.max) / 2)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            * বাজার ও সময় অনুযায়ী পণ্যের দাম পরিবর্তিত হতে পারে।
          </p>

        </section>
      </div>
    </main>
  );
};

export default DetilsPage;