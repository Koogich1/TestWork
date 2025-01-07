"use client"

import { RootState } from "@/app/store/store";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

type Props = {
	id: number,
	setChoosenId: React.Dispatch<React.SetStateAction<number | null>>;
}

const ChoosenProductCard = ({id, setChoosenId}: Props) => {

	const products = useSelector((state: RootState) => state.products.products);
  const product = products.find(p => p.id === Number(id));

	if (!product) {
		return <div>Товара нет, к сожалению</div>
	}

	return (
			<div className="w-full mt-12">
				<div className="bg-white border rounded p-4 text-center relative">
					<Button 
						className="absolute top-0 right-0 m-2"
						onClick={() => setChoosenId(null)}
					>
						Вернуться
					</Button>
					<img src={product.imageUrl} alt={product.title} className="w-full object-contain mb-4 max-h-[45vh]" />
					<h2 className="font-semibold text-2xl mb-2">{product.title}</h2>
						<p className="text-gray-600 text-sm">{product.description}</p>
				</div>
			</div>
 );

}

export default ChoosenProductCard