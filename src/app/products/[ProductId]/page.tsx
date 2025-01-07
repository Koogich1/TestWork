"use client"

import { RootState } from "@/app/store/store";
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation";
import { Provider, useSelector } from "react-redux";

const Page = () => {
	const router = useRouter();
	const {ProductId} = useParams()

	const products = useSelector((state: RootState) => state.products.products);
  const product = products.find(p => p.id === Number(ProductId));

	if (!product) {
		return <div>Товара нет, к сожалению</div>
	}

	return (
			<div className="container mx-auto p-4">
				<div className="bg-white border rounded p-4 text-center">
					<img src={product.imageUrl} alt={product.title} className="w-full object-contain mb-4 max-h-[45vh]" />
					<h2 className="font-semibold text-2xl mb-2">{product.title}</h2>
						<p className="text-gray-600 text-sm">{product.description}</p>
				</div>
			</div>
 );

}

export default Page