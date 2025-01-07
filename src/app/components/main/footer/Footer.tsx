"use client"

import { RiTelegram2Fill } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";
import { FaVk } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {

  const liStyle = 'px-5 py-[0.125rem] transition-all cursor-pointer'
	return (
		<footer className="row-start-3 flex gap-3 flex-col flex-wrap items-center justify-center mt-10 h-[220px] bg-white">
      <div className="flex gap-3 text-2xl text-yellow-500">
        <div className="w-12 h-12 border border-yellow-500 hover:bg-yellow-500 hover:text-white transition-all shadow-sm rounded-full flex items-center justify-center cursor-pointer">
          <RiTelegram2Fill />
        </div>
        <div className="w-12 h-12 border border-yellow-500 hover:bg-yellow-500 hover:text-white transition-all shadow-sm rounded-full flex items-center justify-center cursor-pointer">
          <FaWhatsapp />
        </div>
        <div className="w-12 h-12 border border-yellow-500 hover:bg-yellow-500 hover:text-white transition-all shadow-sm rounded-full flex items-center justify-center cursor-pointer">
          <FaVk />
        </div>
      </div>
      <div>
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
      <p className="text-yellow-500">© 2025</p>
    </footer>
	)
}

export default Footer