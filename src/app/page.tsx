import Banner from "@/components/Banner";
import HighPrice from "@/components/HighPrice";
import LowPrice from "@/components/LowPrice";
import Marquee from "@/components/Marquee";
import Navliks from "@/components/Navliks";

;
import Image from "next/image";
import { Suspense } from "react";


export default function Home() {
  return (
	<div>
		<Suspense
  fallback={
    <div className="flex justify center items-center min-h-screen">
      <span className="loading loading-infinity loading-xl text-blue-600"></span>
    </div>
  }
>
	<div className="container mx-auto">

  <Navliks />


	</div>
 <Marquee></Marquee>

	</Suspense>
	<Banner></Banner>

	<Suspense fallback={<div> Top six high price loading..</div>}>
	<HighPrice></HighPrice>
	</Suspense>
	<Suspense fallback={<div> Top six Lowest price loading..</div>}>
	<LowPrice></LowPrice>
	</Suspense>



	</div>
  );
}
