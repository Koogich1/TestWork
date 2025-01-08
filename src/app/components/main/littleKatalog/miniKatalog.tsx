"use client"

import { RootState } from '@/app/store/store';
import { Button } from '@/components/ui/button';
import React from 'react'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const truncateText = (text: string, maxLength: number) => {
	if (text.length > maxLength) {
		return text.substring(0, maxLength) + '...';
	}
	return text;
};

const MiniKatalog = () => {	
	const products = useSelector((state: RootState) => state.products.products);
	const router = useRouter()

	const firstProducts = products.slice(0, 3)

	return (
		<div className='mt-20 flex w-full itmes-center justify-center flex-col gap-3'>
			<h1 className='text-5xl text-center font-bold text-gray-800'>
				Ваш надежный IphoneStore онлайн
			</h1>
			<span className='text-center'>
				Самый удобный способ купить ваш iPhone
			</span>
			<span className='text-center font-semibold'>
				Мини каталог:
			</span>
			<div className='w-full flex items-center justify-center mt-2'>
				<div className='grid grid-cols-3 max-w-[900px] gap-3'>
					{firstProducts.map((product) => (
						<div key={product.id} className='relative bg-white rounded-lg border border-gray-200 transition-all hover:scale-[102%] hover:shadow-lg shadow-sm'>
						<div
							className="z-10 rounded p-4 flex flex-col h-full cursor-pointer"
							onClick={() => {
								router.push(`/products`)
							}}
						>
							<div className="flex justify-between items-center w-full z-50">
							</div>
							<img src={product.imageUrl} alt={product.title} className="w-full h-[13rem] object-contain mb-4" />
								<h3 className="font-semibold text-lg mb-2">{product.title}</h3>
								<p className="text-gray-600 text-sm h-20 overflow-hidden">{truncateText(product.description, 150)}</p>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className='flex items-center justify-center'>
				<Link href={"/products"}>
						<Button size={"lg"} className="text-lg bg-yellow-400 text-blue-900 font-meduim hover:bg-yellow-500 h-12">
							В каталог
						</Button>
					</Link>
			</div>
		</div>
	)
}

export default MiniKatalog