'use client'

import Link from "next/link";
import { FaApple } from "react-icons/fa";

const Header = () => {

	const liStyle = 'px-5 py-1 border-l border-gray-200 hover:bg-gray-100 transition-all cursor-pointer'
	return (
		<div className='flex justify-between items-center bg-white fixed top-0 w-full px-5 lg:px-[5%] py-3 shadow-sm z-[1000]'>
			<div className='flex gap-2 items-center text-2xl '>
				<div className='p-1 bg-gray-600 text-white rounded-lg'>
					<FaApple />
				</div>
				<p className='font-semibold'>Iphonium</p>
			</div>
			<ul className='flex'>
				<Link href={"/"}>
					<li className={liStyle}>
						О нас
					</li>
				</Link>
				<Link href={"/products"}>
					<li className={liStyle}>
						Каталог
					</li>
				</Link>
			</ul>
		</div>
	)
}

export default Header