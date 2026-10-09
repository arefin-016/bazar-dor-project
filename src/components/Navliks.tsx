
import React from 'react';
interface Navlinks{
	id: string,
slug: string,
nameBn: string,
icon: string
}
const Navliks = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories"
  );

  const data:Navlinks[] = await res.json();


console.log(data,"Navlinks")
  return (
   <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 mt-5">
  {data.map((nav) => (
    <div
      className="flex items-center gap-1"
      key={nav.id}
    >
      <span>{nav.icon}</span>
      {nav.nameBn}
    </div>
  ))}
</div>
  );
};

export default Navliks;