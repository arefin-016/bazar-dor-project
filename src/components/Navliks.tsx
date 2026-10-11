
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Navlinks {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const Navliks = () => {
  const pathname = usePathname();

  const [data, setData] = useState<Navlinks[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/categories"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const result = await res.json();

        const categories: Navlinks[] = Array.isArray(result)
          ? result
          : result.data;

        setData(Array.isArray(categories) ? categories : []);
      } catch (error) {
        console.error("Navlinks API error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="mt-5 flex gap-3">
        <span className="loading loading-spinner loading-sm text-green-600" />
        <span className="text-sm text-gray-500">
          ক্যাটাগরি লোড হচ্ছে...
        </span>
      </div>
    );
  }

  return (
    <nav className="mt-5 w-full">
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {data.map((nav) => {
          const href = `/Category/${nav.slug}`;

          const isActive = pathname === href;

          return (
            <Link
              href={href}
              key={nav.id}
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 sm:px-5 sm:py-2.5 sm:text-base ${
                isActive
                  ? "border-green-600 bg-green-600 text-white shadow-md"
                  : "border-gray-200 bg-white text-gray-700 hover:border-green-500 hover:bg-green-50 hover:text-green-700"
              }`}
            >
              <span className="text-base sm:text-lg">
                {nav.icon}
              </span>

              <span>{nav.nameBn}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navliks;