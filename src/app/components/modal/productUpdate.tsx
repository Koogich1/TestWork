"use client"

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Product, updateProduct } from '@/app/store/store'
import { FaEdit } from 'react-icons/fa'
import { Input } from '@/components/ui/input'
import { useAppDispatch } from '@/app/hooks/useRedux'
import { Textarea } from '@/components/ui/textarea'

type Props = {
  product: Product;
  open: boolean;
  handleOpenChange: any;
}

const ProductUpdate = ({ product, open, handleOpenChange }: Props) => {
  const [editProduct, setEditProduct] = useState<Product>(product);
  const dispatch = useAppDispatch();

  const handleUpdateProduct = () => {
    dispatch(updateProduct(editProduct));
    handleOpenChange(false); // Закрываем диалог после обновления
  };

  const handleEditProductChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, 
    field: 'title' | 'description' | 'imageUrl'
  ) => {
    setEditProduct((prev) => ({
      ...prev,
      [field]: e.target.value,
    }))
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size={"sm"} className="p-1 rounded-sm px-2 bg-gray-200 hover:bg-gray-300 transition-colors text-gray-500">
          <FaEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] py-4">
        <DialogHeader>
          <DialogTitle className='text-2xl'>Редактировать объяву</DialogTitle>
          <DialogDescription>
            <span className='font-bold text-gray-400'>{product.title}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-base">
          <div className="grid gap-2">
            <h3 className='font-bold text-gray-400'>Заголовок</h3>
            <Input
              id="title"
              value={editProduct.title}
              onChange={(e) => handleEditProductChange(e, 'title')}
            />
          </div>
          <div className="grid gap-2">
            <h3 className='font-bold text-gray-400'>Описание</h3>
            <Textarea
              id="description"
              className='min-h-[100px]'
              value={editProduct.description}
              onChange={(e) => handleEditProductChange(e, 'description')}
            />
          </div>
          <div className="grid gap-2">
            <h3 className='font-bold text-gray-400'>Url картинки</h3>
            <Input
              id="imageUrl"
              value={editProduct.imageUrl}
              onChange={(e) => handleEditProductChange(e, 'imageUrl')}
            />
          </div>
        </div>
				<div className='flex gap-2'>
					<Button 
						onClick={() => {
							handleOpenChange(false)
							setEditProduct(product) //Тут нужно понять, сохранять изменения или нет :3, я считаю что отменить не надо сохранять
						}
						} 
						className='w-1/2 bg-gray-200 font-bold text-gray-400 text-base hover:bg-gray-300'
					>
						Отменить
					</Button>
					<Button onClick={handleUpdateProduct} className='w-1/2 bg-blue-500 font-bold text-base hover:bg-blue-600'>Сохранить</Button>
				</div>
      </DialogContent>
    </Dialog>
  )
}

export default ProductUpdate;