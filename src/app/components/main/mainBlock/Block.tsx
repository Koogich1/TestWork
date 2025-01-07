'use client'

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const MainBlock = () => {
	return (
		<div className="mt-20 relative">
			<div className="w-full h-[550px]">
				<Image src={"/main.jpeg"} alt="mainImage" width={1920} height={720} className="z-0 w-full h-[550px] absolute top-0 object-cover blur-[1px]"/>
				<div className="w-full h-[550px] bg-black z-10 absolute top-0 opacity-70"/>
				<div className="z-50 text-white absolute top-0 w-full flex h-[550] items-start flex-col gap-5 justify-center px-5 lg:px-[5%]">
					<h1 className="text-5xl font-extrabold w-1/2">Iphonium - ваш гид в мире Iphone</h1>
					<h3 className="text-lg w-1/2">Обзор, покупка и управление вашими любимыми iPhone устройствами легко и удобно.</h3>
					<Link href={"/products"}>
						<Button size={"lg"} className="text-lg bg-yellow-400 text-blue-900 font-meduim hover:bg-yellow-500 h-12">
							В каталог
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default MainBlock