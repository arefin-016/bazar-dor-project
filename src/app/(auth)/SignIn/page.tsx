

"use client";

import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { signIn } from "@/lib/auth-client";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { toast } from "react-toastify";
import SignInNotice from "@/components/SignInNotice";

export default function Basic() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState(false);

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (isLoading || isSocialLoading) return;

    const formData = new FormData(e.currentTarget);

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      toast.error("ইমেইল এবং পাসওয়ার্ড লিখুন।");
      return;
    }

    try {
      setIsLoading(true);

      const { error } = await signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(
          error.message || "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।"
        );
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");

      // Toast দেখানোর জন্য একটু অপেক্ষা
      await new Promise((resolve) => setTimeout(resolve, 1000));

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Sign in error:", error);

      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (
    provider: "google" | "github"
  ) => {
    if (isLoading || isSocialLoading) return;

    try {
      setIsSocialLoading(true);

      const { error } = await signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(
          error.message ||
            `${provider === "google" ? "Google" : "GitHub"} দিয়ে সাইন ইন করা যায়নি।`
        );

        setIsSocialLoading(false);
      }
    } catch (error) {
      console.error(`${provider} sign-in error:`, error);

      toast.error("সাইন ইন করতে সমস্যা হয়েছে।");

      setIsSocialLoading(false);
    }
  };

  return (
	<>
	 <Suspense fallback={null}>
        <SignInNotice />
      </Suspense>

    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f4f5f6] p-4 font-sans">
      {/* Page Heading */}

      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          সাইন ইন
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে
          অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* Main Card */}

      <div className="w-full max-w-lg rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <Form
          className="flex flex-col gap-5"
          onSubmit={onSubmit}
        >
          {/* Email Field */}

          <TextField
            isRequired
            name="email"
            type="email"
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                  value
                )
              ) {
                return "সঠিক ইমেইল ঠিকানা লিখুন";
              }

              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-700">
              ইমেইল
            </Label>

            <Input
              autoComplete="email"
              placeholder="example@email.com"
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-all focus:border-[#05893e] focus:ring-1 focus:ring-[#05893e]"
            />

            <FieldError className="text-xs text-red-500" />
          </TextField>

          {/* Password Field */}

          <TextField
            isRequired
            name="password"
            type="password"
            minLength={8}
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (value.length < 8) {
                return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
              }

              if (!/[A-Z]/.test(value)) {
                return "পাসওয়ার্ডে অন্তত একটি বড় হাতের ইংরেজি অক্ষর থাকতে হবে";
              }

              if (!/[0-9]/.test(value)) {
                return "পাসওয়ার্ডে অন্তত একটি সংখ্যা থাকতে হবে";
              }

              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-700">
              পাসওয়ার্ড
            </Label>

            <Input
              type="password"
              autoComplete="current-password"
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-all focus:border-[#05893e] focus:ring-1 focus:ring-[#05893e]"
            />

            <Description className="text-xs text-gray-500">
              কমপক্ষে ৮ অক্ষর, একটি বড় হাতের অক্ষর এবং
              একটি সংখ্যা থাকতে হবে।
            </Description>

            <FieldError className="text-xs text-red-500" />
          </TextField>

          {/* Action Buttons */}

          <div className="flex w-full gap-2">
            <Button
              type="submit"
              isDisabled={isLoading || isSocialLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#05893e] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#047233] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
            </Button>

            <Button
              type="reset"
              isDisabled={isLoading || isSocialLoading}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              রিসেট
            </Button>
          </div>

          {/* Divider */}

          <div className="relative my-2 flex w-full items-center justify-center">
            <div className="w-full border-t border-gray-200" />

            <span className="absolute bg-white px-3 text-xs text-gray-400">
              অথবা
            </span>
          </div>

          {/* Google Sign In */}

          <button
            type="button"
            disabled={isLoading || isSocialLoading}
            onClick={() => handleSocialSignIn("google")}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />

              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />

              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18A12 12 0 0 0 1 12c0 1.73.37 3.38 1.18 4.94z"
              />

              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>

            Google দিয়ে চালিয়ে যান
          </button>

          {/* GitHub Sign In */}

          <button
            type="button"
            disabled={isLoading || isSocialLoading}
            onClick={() => handleSocialSignIn("github")}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg
              className="h-5 w-5 fill-current text-gray-800"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>

            GitHub দিয়ে চালিয়ে যান
          </button>

          {/* Sign Up Link */}

          <p className="mt-4 text-center text-sm text-gray-600">
            অ্যাকাউন্ট নেই?{" "}

            <Link
              href="/SIgnUp"
              className="font-medium text-[#05893e] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </Form>
      </div>

      {/* Back to Home */}

      <div className="mt-6">
        <Link
          href="/"
          className="text-sm text-gray-500 transition-colors hover:text-gray-700"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
	</>
  );
}
