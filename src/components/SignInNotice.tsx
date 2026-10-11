"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function SignInNotice() {
  const searchParams = useSearchParams();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (
      searchParams.get("redirected") === "true" &&
      !hasShownToast.current
    ) {
      hasShownToast.current = true;

      toast.info("এই পেজটি দেখতে প্রথমে সাইন ইন করুন।", {
        toastId: "protected-route-notice",
      });
    }
  }, [searchParams]);

  return null;
}