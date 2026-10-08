import Navliks from "@/components/Navliks";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
	<div className="container mx-auto">
		<Suspense
  fallback={
    <div className="flex justify center items-center min-h-screen">
      <span className="loading loading-infinity loading-xl text-blue-600"></span>
    </div>
  }
>
  <Navliks />
</Suspense>
	</div>
  );
}
