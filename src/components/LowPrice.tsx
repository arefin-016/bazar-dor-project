import React from 'react';

const LowPrice = async() => {
	const res=await fetch("https://api.api-store.workers.dev/api/bazardor/products");
	const data:Tproduct[]=await res.json();
	const filterProduct = data.filter(
  product => product.change.dir === "down");
	const top6Products = filterProduct.sort((a, b) =>a.change.pct - b.change.pct).slice(0,6);
	console.log(top6Products)
	return (
		<div className='container mx-auto mt-9'>
			<div className='flex gap-2 items-center'>

				<h1 className='text-red-500'>▲</h1>
				<h1 className='font-bold text-2xl'>আজ দাম বেড়েছে</h1>
			</div>
{

	top6Products.map(tProduct=><div key={tProduct.id}>{tProduct.nameBn}</div>)
}
		</div>
	);
};

export default LowPrice;