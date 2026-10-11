import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg sm:p-12">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-50 text-5xl">
          🛒
        </div>

        {/* 404 */}
        <h1 className="text-8xl font-extrabold text-green-600">
          404
        </h1>

        {/* Message */}
        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h2>

        <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
          দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।
          ঠিকানাটি ভুল হতে পারে অথবা পেজটি সরিয়ে ফেলা হয়েছে।
        </p>

        {/* Home Button */}
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          <span>←</span>
          হোম পেজে ফিরে যান
        </Link>

        {/* Footer Text */}
        <p className="mt-8 text-sm text-gray-400">
          <span className="font-semibold text-green-700">
            বাজার দর
          </span>
          {" — "}প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
      </div>
    </main>
  );
}