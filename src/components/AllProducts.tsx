import React from 'react';
import { Tproduct } from './HighPrice';
import ProductCard from './ProductCard';

const AllProducts = async() => {
	const res=await fetch("https://api.abcz.workers.dev/api/bazardor/products");
	const data:Tproduct[]=await res.json();
	console.log("alllproduct", data)
	return (
		<div className='container mx-auto mt-9'>
			<h1 className='font-bold text-2xl'>সব পণ্য</h1>

			<p className='text-gray-600 mt-2'>মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-5'>

{

data.map(product=><ProductCard key={product.id} product={product}></ProductCard>)
}</div>

		</div>
	);
};

export default AllProducts;