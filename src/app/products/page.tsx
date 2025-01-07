"use client"

import React from 'react'
import ProductList from "../components/product/productList"
import { Provider } from 'react-redux';
import { store } from '../store/store';

const Products = () => {
 return (
   <div className='px-5 lg:px-[5%]'>
      <ProductList />
   </div>
 )
}

export default Products