import React, { useState } from 'react';
import { Product } from '../../store/store'; 
import { FaHeart, FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '../../hooks/useRedux';
import { toggleFavorite, removeProduct } from '../../store/store'; 
import { Button } from '@/components/ui/button';
import ProductUpdate from '../modal/productUpdate';
import Image from 'next/image';


interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false)

  const handleCardClick = (e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).closest('.like-icon') ||
      (e.target as HTMLElement).closest('.remove-icon')
    ) {
      return;
    }
    router.push(`/products/${product.id}`);
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(product.id));
  };

    const handleRemoveProduct = () => {
    dispatch(removeProduct(product.id));
  };

  //Текст максимальный уменьшаем
  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className='relative bg-white rounded-lg border border-gray-200 transition-all hover:scale-[102%] hover:shadow-lg shadow-sm'>
      <div className='absolute w-full flex justify-between p-2 top-0 left-0 z-50'>
        <Button onClick={handleToggleFavorite} size={"sm"} className={`p-1 rounded-sm px-2 transition-colors text-gray-500 ${product.isFavorite ? 'text-red-500 bg-red-100 hover:bg-red-200' : 'text-gray-500 bg-gray-200 hover:bg-gray-300'}`}>
          <FaHeart />
        </Button>
        <div className='flex gap-1'>
          <Button onClick={handleRemoveProduct} size={"sm"} className="p-1 rounded-sm px-2 bg-gray-200 hover:bg-gray-300 transition-colors text-gray-500">
            <FaTrash />
          </Button>
          <ProductUpdate product={product} open={open} handleOpenChange={setOpen}/>
        </div>
      </div>
      <div
        className="z-10 rounded p-4 flex flex-col h-full cursor-pointer"
        onClick={handleCardClick}
      >
      <div className="flex justify-between items-center w-full z-50">
      </div>
      <Image src={product.imageUrl} alt={product.title} className="w-full h-[13rem] object-contain mb-4" />
        <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
        <p className="text-gray-600 text-sm h-20 overflow-hidden">{truncateText(product.description, 150)}</p>
      </div>
    </div>
  );
};

export default ProductCard;