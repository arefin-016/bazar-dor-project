
"use client";

import React, { useState } from "react";
import { signUp, signIn } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Basic() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Password states
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Signup form submission
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData(e.currentTarget);

    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    // Confirm password validation
    if (data.password !== data.confirmPassword) {
      setErrorMessage("পাসওয়ার্ড দুটি মিলছে না।");
      return;
    }

    setLoading(true);

    try {
      const { data: signupData, error } = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(
          error.message || "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।"
        );
        return;
      }

      if (signupData) {
        setSuccessMessage("আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");

        router.push("/SignIn");
      }
    } catch (error) {
      console.error("Signup error:", error);

      setErrorMessage(
        "একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।"
      );
    } finally {
      setLoading(false);
    }
  };

  // Google Signup
  const handleGoogleSignUp = async () => {
    try {
      setErrorMessage("");

      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(
          error.message || "Google দিয়ে সাইন আপ করা যায়নি।"
        );
      }
    } catch (error) {
      console.error("Google signup error:", error);

      setErrorMessage("Google দিয়ে সাইন আপ করা যায়নি।");
    }
  };

  // GitHub Signup
  const handleGitHubSignUp = async () => {
    try {
      setErrorMessage("");

      const { error } = await signIn.social({
        provider: "github",
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(
          error.message || "GitHub দিয়ে সাইন আপ করা যায়নি।"
        );
      }
    } catch (error) {
      console.error("GitHub signup error:", error);

      setErrorMessage("GitHub দিয়ে সাইন আপ করা যায়নি।");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f4f5f6] p-4 font-sans">
      {/* Page Heading */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          অ্যাকাউন্ট তৈরি করুন
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-lg rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
          {/* Name */}
          <TextField
            isRequired
            name="name"
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (value.trim().length < 3) {
                return "নাম কমপক্ষে ৩ অক্ষরের হতে হবে।";
              }

              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-700">
              নাম
            </Label>

            <Input
              placeholder="আপনার পুরো নাম লিখুন"
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-all focus:border-[#05893e] focus:ring-1 focus:ring-[#05893e]"
            />

            <FieldError className="text-xs text-red-500" />
          </TextField>

          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return "সঠিক ইমেইল ঠিকানা লিখুন।";
              }

              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-700">
              ইমেইল
            </Label>

            <Input
              placeholder="example@gmail.com"
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-all focus:border-[#05893e] focus:ring-1 focus:ring-[#05893e]"
            />

            <FieldError className="text-xs text-red-500" />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            name="password"
            type="password"
            minLength={8}
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (value.length < 8) {
                return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
              }

              if (!/[A-Z]/.test(value)) {
                return "কমপক্ষে একটি ইংরেজি বড় হাতের অক্ষর দিন।";
              }

              if (!/[0-9]/.test(value)) {
                return "কমপক্ষে একটি সংখ্যা দিন।";
              }

              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-700">
              পাসওয়ার্ড
            </Label>

            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="একটি শক্তিশালী পাসওয়ার্ড দিন"
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-all focus:border-[#05893e] focus:ring-1 focus:ring-[#05893e]"
            />

            <Description className="text-xs text-gray-500">
              কমপক্ষে ৮ অক্ষর, একটি বড় হাতের অক্ষর ও একটি সংখ্যা থাকতে হবে।
            </Description>

            <FieldError className="text-xs text-red-500" />
          </TextField>

          {/* Confirm Password */}
          <TextField
            isRequired
            name="confirmPassword"
            type="password"
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (value !== password) {
                return "পাসওয়ার্ড দুটি মিলছে না।";
              }

              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-700">
              পাসওয়ার্ড নিশ্চিত করুন
            </Label>

            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="আবার পাসওয়ার্ড লিখুন"
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-all focus:border-[#05893e] focus:ring-1 focus:ring-[#05893e]"
            />

            <FieldError className="text-xs text-red-500" />
          </TextField>

          {/* Error Message */}
          {errorMessage && (
            <div
              role="alert"
              className="w-full rounded-lg bg-red-50 p-3 text-sm text-red-600"
            >
              {errorMessage}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div
              role="status"
              className="w-full rounded-lg bg-green-50 p-3 text-sm text-green-700"
            >
              {successMessage}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            isDisabled={loading}
            className="mt-1 w-full rounded-lg bg-[#05893e] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#047331]"
          >
            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
          </Button>

          {/* Divider */}
          <div className="relative my-2 flex w-full items-center justify-center">
            <div className="w-full border-t border-gray-200" />

            <span className="absolute bg-white px-3 text-xs text-gray-400">
              অথবা
            </span>
          </div>

          {/* Social Auth Buttons */}
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Google */}
            <Button
              type="button"
              onPress={handleGoogleSignUp}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
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
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />

                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>

              Google দিয়ে চালিয়ে যান
            </Button>

            {/* GitHub */}
            <Button
              type="button"
              onPress={handleGitHubSignUp}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              <svg
                className="h-4 w-4 fill-current text-gray-800"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 1.23c.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>

              GitHub দিয়ে চালিয়ে যান
            </Button>
          </div>

          {/* Footer Link */}
          <p className="mt-4 w-full text-center text-xs text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/SignIn"
              className="font-medium text-[#05893e] hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
