import React from 'react';
export interface Tproduct{

unit:string,
nameBn:string,
categoryIcon:string,
change:{
	dir:string,
	pct:number

},
id:number

}

const HighPrice =async () => {
	const res=await fetch("https://api.api-store.workers.dev/api/bazardor/products");
	const data:Tproduct[]=await res.json();
	const filterProduct = data.filter(
  product => product.change.dir === "up");
	const top6Products = filterProduct.sort((a, b) =>b.change.pct - a.change.pct).slice(0,6);
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

export default HighPrice;