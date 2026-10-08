
import React from 'react';
interface Navlinks{
	id: string,
slug: string,
nameBn: string,
icon: string
}
const Navliks = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories"
  );

  const data:Navlinks[] = await res.json();



  return (
    <div className=' flex  gap-8 mt-8'>
      {data.map((nav) => (
        <div className='flex gap-2' key={nav.id}>
			<span>{nav.icon}</span>

			{nav.nameBn}</div>
      ))}
    </div>
  );
};

export default Navliks;