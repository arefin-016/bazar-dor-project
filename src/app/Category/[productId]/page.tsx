"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number | string;
  yesterday: number | string;
  lastWeek: number | string;
  lastMonth: number | string;
  change: {
    dir: "up" | "down" | "stable";
    pct: number;
  };
}

const CategoryPage = () => {
  const params = useParams<{ productId: string }>();
  const productId = params.productId;

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch category products
  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `https://api.api-store.workers.dev/api/bazardor/products?category=${encodeURIComponent(productId)}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
        }

        const data = await res.json();

        const result: Product[] = Array.isArray(data)
          ? data
          : data.data ?? [];

        setProducts(result);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    if (productId) {
      fetchProducts();
    }

    return () => controller.abort();
  }, [productId]);

  // Convert Bengali digits to English digits
  const normalizeDigits = (value: number | string) => {
    const banglaDigits = "০১২৩৪৫৬৭৮৯";

    return String(value)
      .replace(/[০-৯]/g, (digit) =>
        String(banglaDigits.indexOf(digit))
      )
      .replace(/,/g, "");
  };

  // Convert price to a number
  const getNumericPrice = (price: number | string) => {
    const normalized = normalizeDigits(price);
    const number = Number(normalized);

    return Number.isFinite(number) ? number : 0;
  };

  // Search and sorting
  const filteredProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    const result = products.filter((product) => {
      const name = product.nameBn.toLocaleLowerCase();
      const category = product.categoryNameBn.toLocaleLowerCase();
      const slug = product.slug.toLocaleLowerCase();

      return (
        name.includes(query) ||
        category.includes(query) ||
        slug.includes(query)
      );
    });

    if (sortBy === "price-low") {
      result.sort(
        (a, b) =>
          getNumericPrice(a.today) - getNumericPrice(b.today)
      );
    }

    if (sortBy === "price-high") {
      result.sort(
        (a, b) =>
          getNumericPrice(b.today) - getNumericPrice(a.today)
      );
    }

    return result;
  }, [products, search, sortBy]);

  const categoryName = products[0]?.categoryNameBn ?? "পণ্য";
  const categoryIcon = products[0]?.categoryIcon ?? "🛒";

  const getUnit = (unit: string) => {
    if (unit === "kg") return "কেজি";
    if (unit === "liter") return "লিটার";
    if (unit === "piece") return "টি";

    return unit;
  };

  // Loading state
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F0F5F0]">
        <span className="loading loading-infinity loading-xl text-green-700" />
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F0F5F0] p-4">
        <p className="rounded-xl bg-white p-6 text-center text-red-600">
          {error}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F0F5F0]">
      <div className="container mx-auto max-w-6xl px-4 py-6 md:px-6">

        {/* Category Header */}
        <section className="mb-4 flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 md:p-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-2xl">
            {categoryIcon}
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
              {categoryName}
            </h1>

            <p className="mt-1 text-xs text-gray-500 md:text-sm">
              {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </section>

        {/* Search and Sorting */}
        <section className="mb-4 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">

          {/* Search Bar */}
          <div className="flex w-full items-center gap-2 rounded-xl border border-gray-200 px-3 sm:max-w-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 text-gray-400"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="পণ্যের নাম লিখুন..."
              aria-label="পণ্য খুঁজুন"
              className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="সার্চ মুছুন"
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center justify-between gap-2 sm:justify-end">
            <label
              htmlFor="category-sort"
              className="shrink-0 text-sm text-gray-500"
            >
              সাজান
            </label>

            <div className="relative">
              <select
                id="category-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 min-w-48 appearance-none rounded-xl border border-gray-200 bg-white py-2 pl-3 pr-10 text-sm text-gray-700 outline-none focus:border-green-600"
              >
                <option value="default">ডিফল্ট</option>
                <option value="price-low">
                  দাম: কম থেকে বেশি
                </option>
                <option value="price-high">
                  দাম: বেশি থেকে কম
                </option>
              </select>

              {/* Chevron */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
        </section>

        {/* Product Count */}
        <p className="mb-4 text-sm text-gray-500">
          {search
            ? `সার্চের ফলাফল: ${filteredProducts.length}টি পণ্য`
            : `মোট ${filteredProducts.length}টি পণ্য`}
        </p>

        {/* Product Cards */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                className="group rounded-2xl border border-gray-200 bg-white p-4 transition hover:-translate-y-1 hover:shadow-md"
              >
                {/* Product Name */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-xl">
                    {product.image || product.categoryIcon}
                  </div>

                  <div>
                    <h2 className="font-bold text-gray-900 group-hover:text-green-700">
                      {product.nameBn}
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                      {product.categoryNameBn}
                    </p>
                  </div>
                </div>

                {/* Today's Price */}
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <p className="mb-1 text-xs text-gray-500">
                      বাজারদর
                    </p>

                    <p className="text-lg font-bold text-gray-900">
                      {product.today} টাকা
                    </p>

                    <p className="text-xs text-gray-500">
                      প্রতি {getUnit(product.unit)}
                    </p>
                  </div>

                  {/* Price Change */}
                  <span
                    className={`badge border-0 px-2 py-3 text-xs font-semibold ${
                      product.change.dir === "up"
                        ? "bg-red-50 text-red-600"
                        : product.change.dir === "down"
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {product.change.dir === "up"
                      ? "▲"
                      : product.change.dir === "down"
                      ? "▼"
                      : "—"}{" "}
                    {product.change.pct.toLocaleString("bn-BD", {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })}
                    %
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white px-4 py-12 text-center">
            <p className="mb-2 text-3xl">🔎</p>

            <h2 className="font-bold text-gray-800">
              কোনো পণ্য পাওয়া যায়নি
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              অন্য কোনো পণ্যের নাম দিয়ে সার্চ করো।
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSortBy("default");
              }}
              className="btn btn-sm mt-4 rounded-lg bg-green-700 text-white hover:bg-green-800"
            >
              সব পণ্য দেখুন
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default CategoryPage;