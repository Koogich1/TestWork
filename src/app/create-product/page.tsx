"use client"

import { useAppDispatch } from "@/app/hooks/useRedux";
import { createProduct, Product } from "@/app/store/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import ErrorBlock from "../components/error/ErrorBlock";
import { FaHeart, FaTrash } from "react-icons/fa";
import Image from "next/image";

const CreateProductPage = () => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [preview, setPreview] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleCreateProduct = () => {
    if (!title || !description || !imageUrl) {
      setError("Все поля должны быть заполнены.");
      return;
    }

    const newProduct: Product = {
      id: Date.now(), // Можно использовать уникальный идентификатор
      title,
      description,
      imageUrl,
      isFavorite: false,
    };

    dispatch(createProduct(newProduct));

    setPreview(false);
    setImageUrl("");
    setTitle("");
    setDescription("");
		alert("Удачно создано")
  };

  const isValidUrl = (url: string): boolean => {
    const pattern = new RegExp('^https?:\\/\\/[^\\s$.?#].[^\\s]*$');
    return pattern.test(url);
  };

  const ChangeToPreview = () => {
    if (!title) {
      setError("Введи название...");
      return;
    }
    if (!description) {
      setError("Ты забыл про описание...");
      return;
    }
    if (!imageUrl.length) {
      setError("Вбей ссылку на изображение, если лень - на кнопке.");
      return;
    }
    if (!isValidUrl(imageUrl)) {
      setError("Ты хотел меня обмануть, а это ведь не ссылка!!!");
      return;
    }
    setError("");
    setPreview(true);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className="px-5 lg:px-[5%] min-h-[65vh]">
      <div className="bg-white rounded-lg shadow-lg p-4">
				<h1 className="text-2xl font-semibold text-center mb-4">Создание нового продукта</h1>
				{preview ? (
					<div className="flex flex-col items-center">
						<div className="w-2/5 max-w-[280px]">
							<div className='relative bg-white rounded-lg border border-gray-200 transition-all hover:scale-[102%] hover:shadow-lg shadow-sm'>
								<div className='absolute w-full flex justify-between p-2 top-0 left-0 z-50'>
									<Button size={"sm"} className={`p-1 rounded-sm px-2 bg-gray-200 hover:bg-gray-300 transition-colors text-gray-500`}>
										<FaHeart />
									</Button>
									<div className='flex gap-1'>
										<Button size={"sm"} className="p-1 rounded-sm px-2 bg-gray-200 hover:bg-gray-300 transition-colors text-gray-500">
											<FaTrash />
										</Button>
									</div>
								</div>
								<div className="z-10 rounded p-4 flex flex-col h-full cursor-pointer">
									<Image src={imageUrl} alt={title} className="w-full h-[13rem] object-contain mb-4" />
									<h3 className="font-semibold text-lg mb-2">{title}</h3>
									<p className="text-gray-600 text-sm h-20 overflow-hidden">{truncateText(description, 150)}</p>
								</div>
							</div>
						</div>
						<div className="w-full mt-5 flex gap-2">
							<Button 
								className="w-1/2 bg-gray-200 text-gray-500 hover:bg-gray-300 hover:text-gray-600 font-semibold"
								onClick={() => {
									setPreview(false);
								}}
							>
								Вернуться
							</Button>
							<Button 
								className="w-1/2 bg-blue-500 hover:bg-blue-600"
								onClick={handleCreateProduct}
							>
								Сохранить
							</Button>
						</div>
					</div>
				) : (
					<div className="grid gap-4 py-4 w-full">
						<div className="grid gap-2">
							<h3>Заголовок</h3>
							<Input
								id="title"
								placeholder="Любой яблочный продукт..."
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className="placeholder:text-gray-300"
							/>
						</div>
						<div className="grid gap-2">
							<h3>Описание</h3>
							<Textarea
								id="description"
								placeholder="Описание любого яблочного продукта..."
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								className="placeholder:text-gray-300"
							/>
						</div>
						<div className="grid gap-2">
							<h3>Url картинки</h3>
							<div className="flex gap-2">
								<Input
									id="imageUrl"
									placeholder="Ссылка на изображение любого яблочного продукта..."
									value={imageUrl}
									onChange={(e) => setImageUrl(e.target.value)}
									className="placeholder:text-gray-300"
								/>
								<Button onClick={() => { setImageUrl("https://avatars.mds.yandex.net/i?id=78c68e276b2c4f10540339d1b2e9967f_l-5319082-images-thumbs&n=13") }}>
									Готовая ссылка
								</Button>
							</div>
						</div>
						{error && <ErrorBlock ErrorMessage={error} />}
						<Button onClick={ChangeToPreview} className="bg-blue-500 hover:bg-blue-600">Далее</Button>
					</div>
				)}
			</div>
    </div>
  );
}

export default CreateProductPage;
