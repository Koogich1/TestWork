"use client"

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './productCard';
import { RootState, setFavoriteFilter, setCurrentPage, setSearchQuery } from '../../store/store';
import { useAppDispatch } from '../../hooks/useRedux';
import { Button } from '@/components/ui/button';
import HashLoader from "react-spinners/HashLoader";
import { Input } from '@/components/ui/input';
import { FaPlus } from 'react-icons/fa';
import ProductCreate from '../modal/productCreate';
import ChoosenProductCard from './PageForProduct';

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const favoriteFilter = useSelector((state: RootState) => state.products.favoriteFilter);
  const currentPage = useSelector((state: RootState) => state.products.currentPage);
  const productsPerPage = useSelector((state: RootState) => state.products.productsPerPage);
  const searchQuery = useSelector((state: RootState) => state.products.searchQuery); // Получаем поисковый запрос
  const [createModal, setOpenCreateModal] = useState<boolean>(false)
  const [choosenCardId, setChoosenCardId] = useState<number | null>(null)

  const filteredProducts = favoriteFilter
      ? products.filter(product => product.isFavorite)
      : products;

  const searchedProducts = filteredProducts.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = searchedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleFilterChange = (filter: boolean) => {
      dispatch(setFavoriteFilter(filter));
      dispatch(setCurrentPage(1)); // Сбрасываем страницу при смене фильтра
  };

  const handlePageChange = (pageNumber: number) => {
      dispatch(setCurrentPage(pageNumber));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearchQuery(e.target.value));
      dispatch(setCurrentPage(1)); // Сбрасываю страницу когда пользователь в поисках
  };


  const totalPages = Math.ceil(searchedProducts.length / productsPerPage);


  const paginationButtons: React.ReactNode[] = [];

    for (let i = 1; i <= totalPages; i++) {
      paginationButtons.push(
        <Button
            key={i}
            className={`px-[0.85rem] py-1 font-semibold rounded-md ${currentPage === i ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-white text-gray-500 hover:bg-blue-200 hover:text-blue-500'}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }

  const renderPagination = () => {
    if(totalPages <= 1) return null; // убираем пагинацию если нет страниц

   return (
     <div className="flex gap-2 mt-4 items-center justify-center">
      <Button
        disabled={currentPage === 1}
        className="py-1 rounded-md text-gray-600 font-medium px-3 bg-white hover:bg-blue-200 hover:text-blue-600"
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Предыдущая
       </Button>
       {paginationButtons}
      <Button
         disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md text-gray-700 bg-white hover:bg-blue-200 hover:text-blue-600"
        onClick={() => handlePageChange(currentPage + 1)}
     >
        Следующая
      </Button>
    </div>
     )
   }


  return (
    <div>
        <div className='flex gap-2 p-2 bg-white shadow-lg rounded-lg'>
          <Button
            className={`px-4 py-2 rounded-md  ${!favoriteFilter ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-100 hover:bg-blue-200 text-gray-700 hover:text-blue-500'}`}
            onClick={() => handleFilterChange(false)}
          >
            Все
          </Button>
          <Button
            className={`px-4 py-2 rounded-md ${favoriteFilter ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-100 hover:bg-blue-200 text-gray-700 hover:text-blue-500'}`}
            onClick={() => handleFilterChange(true)}
          >
            Избранное
          </Button>
          <Input
            type="text"
            placeholder="Поиск..."
            value={searchQuery}
            onChange={handleSearchChange}
            className='placeholder:text-gray-400'
          />
          <Button 
            className='bg-blue-500 hover:bg-blue-600 text-white'
            onClick={() => {
              setOpenCreateModal(true)
            }}
          >
            Создать карточку
            <FaPlus />
          </Button>
        </div>
          {choosenCardId ? 
          <div className='min-h-[60vh]'>
            <ChoosenProductCard id={choosenCardId} setChoosenId={setChoosenCardId} />
          </div>
        :
        currentProducts.length > 0 ? 
          <div className="grid grid-cols-1 items-start relative sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 mt-4 min-h-[60vh]">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} setChoosenProduct={setChoosenCardId} />
            ))}
          </div>
        :
          <div className='w-full h-[60vh] flex items-center justify-center'>
            <div className=' bg-white w-1/2 h-[20vh] shadow-lg rounded-lg items-center justify-center flex flex-col gap-5'>
              <span className='text-center font-bold'>
                Продуктов нету, возможно их не добавили на сайте, а возможно их нет в избранном, задумайся...
              </span>
              <HashLoader color='#3b82f6' />
            </div>
          </div>
          }
        {
          !choosenCardId && renderPagination()
        }
        <ProductCreate open={createModal} setOpen={setOpenCreateModal} productsLendth={products.length}/>
    </div>
  );
};

export default ProductList;