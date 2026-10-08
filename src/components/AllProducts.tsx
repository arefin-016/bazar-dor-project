import React from 'react';
import { Tproduct } from './HighPrice';

const AllProducts = async() => {
	const res=await fetch("https://api.api-store.workers.dev/api/bazardor/products");
	const data:Tproduct[]=await res.json();
	return (
		<div className='container mx-auto mt-9'>
{

data.map(product=><div key={product.id}>{product.nameBn}</div>)
}

		</div>
	);
};

export default AllProducts;