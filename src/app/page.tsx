import AllProducts from "@/components/AllProducts";
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

      <div className="flex justify-center items-center gap-4 min-h-screen">

  <div className="skeleton  h-32 w-32"></div>
</div>}
    >

<Navliks />
<Marquee></Marquee>
 <Banner></Banner>
 <HighPrice></HighPrice>
	<LowPrice></LowPrice>
	<AllProducts></AllProducts>

	</Suspense>




	</div>
  );
}
