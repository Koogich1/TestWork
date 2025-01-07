"use client"

import Image from "next/image"
import { AiOutlineLike } from "react-icons/ai";
import { FiPlusCircle } from "react-icons/fi";
import { MdOutlineLocalFireDepartment } from "react-icons/md";

const Opportunities = () => {
	return (
		<div className="mt-20 relative">
			<div className="w-full h-[650px]">
				<Image src={"/OpportunitiBg.jpg"} alt="mainImage" width={1920} height={720} className="z-0 w-full h-[650px] absolute top-0 object-cover blur-[1px]"/>
				<div className="w-full h-[650px] bg-black z-10 absolute top-0 opacity-70"/>
				<div className="z-50 text-white absolute top-0 flex h-[650px] w-full items-center flex-col gap-10 justify-center px-5 lg:px-[5%]">
					<h1 className="text-5xl font-extrabold text-center leading-[60px]">Уникальные возможности <br /> Iphonium</h1>
					<div className="flex w-full justify-between">
						<div className="w-1/4 flex items-center flex-col text-center gap-3">
							<div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-5">
								<AiOutlineLike className="text-yellow-400 text-5xl"/>
							</div>
							<h1 className="text-2xl font-bold">
								Удобная навигация
							</h1>
							<span className="font-bold">
								Наш сайт позволяет легко находить и фильтровать продукты с минимальными усилиями.
							</span>
						</div>
						<div className="w-1/4 flex items-center flex-col text-center gap-3 mt-5">
							<div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-5">
								<FiPlusCircle className="text-yellow-400 text-5xl"/>
							</div>
							<h1 className="text-2xl font-bold">
								Удобная навигация
							</h1>
							<span className="font-bold">
								Наш сайт позволяет легко находить и фильтровать продукты с минимальными усилиями.
							</span>
						</div>
						<div className="w-1/4 flex items-center flex-col text-center gap-3">
							<div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-5">
								<MdOutlineLocalFireDepartment className="text-yellow-400 text-5xl"/>
							</div>
							<h1 className="text-2xl font-bold">
								Удобная навигация
							</h1>
							<span className="font-bold">
								Наш сайт позволяет легко находить и фильтровать продукты с минимальными усилиями.
							</span>
						</div>
					</div>
				</div>
			</div>
	</div>
	)
}

export default Opportunities