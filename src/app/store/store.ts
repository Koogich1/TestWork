import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Интерфейс продукта
export interface Product {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  isFavorite: boolean;
}

// Начальное состояние
interface ProductsState {
  products: Product[];
  favoriteFilter: boolean; // true - показать только избранное
  currentPage: number;
  productsPerPage: number;
  searchQuery: string; // Для поиска внутри списка, воот
  sortOption: string;
}

const initialState: ProductsState = {
  products: [
    { id: 1, title: 'iPhone 13', description: 'iPhone 13 с 6.1-дюймовым дисплеем Super Retina XDR, отличной камерой и долгим временем работы от аккумулятора.', imageUrl: 'https://iphoriya.ru/wp-content/uploads/iphone-13-starlight.jpg', isFavorite: false },
    { id: 2, title: 'iPhone 13 Mini', description: 'Компактный iPhone 13 Mini с 5.4-дюймовым дисплеем и такой же мощной производительностью.', imageUrl: 'https://iphoriya.ru/wp-content/uploads/iphone-13-starlight.jpg', isFavorite: false },
    { id: 3, title: 'iPhone 13 Pro', description: 'iPhone 13 Pro с ProMotion и улучшенной системой камер для полученных снимков профессионального качества.', imageUrl: 'https://iphoriya.ru/wp-content/uploads/iphone-13-starlight.jpg', isFavorite: false },
    { id: 4, title: 'iPhone 13 Pro Max', description: 'iPhone 13 Pro Max с 6.7-дюймовым дисплеем и выдающейся батареей для пользователей, требующих максимальной мощности.', imageUrl: 'https://iphoriya.ru/wp-content/uploads/iphone-13-starlight.jpg', isFavorite: false },
    { id: 5, title: 'iPhone 12', description: 'iPhone 12 с новым дизайном, поддержкой 5G и отличными характеристиками камеры;', imageUrl: 'https://export.sulpak.kz/promo/storage/img/WWRU_iPhone12_Q321_Purple_PDP-Image-1B.jpg', isFavorite: false },
    { id: 6, title: 'iPhone 12 Mini', description: 'iPhone 12 Mini — самый компактный и доступный в линейке 12, предлагает великолепные характеристики в маленьком размере.', imageUrl: 'https://export.sulpak.kz/promo/storage/img/WWRU_iPhone12_Q321_Purple_PDP-Image-1B.jpg', isFavorite: false },
    { id: 7, title: 'iPhone SE (2022)', description: 'iPhone SE на базе мощного процессора A15 в компактном корпусе, идеально подходит для пользователей, ищущих бюджетное решение.', imageUrl: 'https://firstapl.ru/pictures/product/big/23266_big.png', isFavorite: false },
    { id: 8, title: 'iPhone 11', description: 'iPhone 11 с двумя камерами и длительным временем работы от аккумулятора предлагает отличное соотношение цены и качества.', imageUrl: 'https://micro-line.ru/images/thumbnails/2020/2020/detailed/4234/orig_xko4-zv.jpg', isFavorite: false },
    { id: 9, title: 'iPhone XR', description: 'iPhone XR с 6.1-дюймовым дисплеем Liquid Retina, доступный и стильный выбор для пользователей.', imageUrl: 'https://my-apple-store.ru/wa-data/public/shop/products/74/00/10074/images/12356/12356.750x0.jpg', isFavorite: false },
    { id: 10, title: 'iPhone 8', description: 'iPhone 8 с классическим дизайном и отличной производительностью, восстановленный вариант.', imageUrl: 'https://avatars.mds.yandex.net/get-marketpic/1457492/picfeec618c7ff2ecaf0a2cfb90e0d90929/orig', isFavorite: false },
    { id: 11, title: 'MacBook Air (M1)', description: 'MacBook Air с чипом M1, невероятная производительность и длительное время работы от аккумулятора в тонком дизайне.', imageUrl: 'https://msk.aura-rent.ru/wp-content/uploads/2020/02/noutbook-air-2.2.jpg', isFavorite: false },
    { id: 12, title: 'MacBook Pro 13" (M1)', description: 'MacBook Pro с 13-дюймовым дисплеем и чипом M1 для профессионалов, которым нужна высокая производительность.', imageUrl: 'https://zurmarket.ru/upload/iblock/939/y.jpg', isFavorite: false },
    { id: 13, title: 'MacBook Pro 14" (M1 Pro)', description: 'Новый MacBook Pro 14" с чипом M1 Pro для мощных задач, включая графический и видео редактирование.', imageUrl: 'https://zurmarket.ru/upload/iblock/939/y.jpg', isFavorite: false },
    { id: 14, title: 'MacBook Pro 16" (M1 Pro)', description: 'MacBook Pro 16" с великолепным Retina дисплеем и чипом M1 Pro для серьезных профессионалов.', imageUrl: 'https://spb.aura-rent.ru/wp-content/uploads/2024/02/1-foto-2.png', isFavorite: false },
    { id: 15, title: 'MacBook Air 2020', description: 'Обновленный MacBook Air 2020 с Intel процессором, доступный и отличный для повседневного использования.', imageUrl: 'https://msk.aura-rent.ru/wp-content/uploads/2020/02/noutbook-air-2.2.jpg', isFavorite: false },
    { id: 16, title: 'MacBook Pro 2020', description: 'MacBook Pro 2020 с процессором Intel и высококачественным дисплеем для профессиональной работы.', imageUrl: 'https://msk.aura-rent.ru/wp-content/uploads/2020/02/noutbook-air-2.2.jpg', isFavorite: false },
    { id: 17, title: 'MacBook Air (M2)', description: 'Новый MacBook Air с чипом M2, впечатляющие характеристики и легкий вес идеально подходят для путешествий.', imageUrl: 'https://yandex-images.clstorage.net/q48cVj217/175882bYtost/ZtpIcw7hI6z8aE67IdrqWDZ3Kps4c2E8pU44MHjsOv5mRwAxqup69H6vmHvePp53lRZ7H0aPIQeOSYSW-RO_SBLvzEbqkSP9uNjqeoEb6wz3oxvPGeMhSTWOjqOa7n34xIFy9k1oiwRLWr1vKrqPFAaH6_9g2wVE6Gq2g3x3uK-3SQshesODbwuqjrui-xhdRcXZHMqEsC2D2z1yyIx9mdfTEWQNinq1WvltTt0aLWUFYasOQNrEVYhL1IENFnr8F8qLQWpTk_-L6-w7kAup75bkaYyr5hOckekNcRi_P8vmkxDlPug6xrtIrxw_ee90x7M6H6NoBIdpiWdRfjR4PUVJKzMpUUO_2lvP-RG52ky2p5u8iYcwviOZ_yC4XT1qJlAylg_KeDVJqZ__nLjdFHZxyDwRKldViatHcz11-g5WGAoDWvLxn_vpjFuiuJmuN7Xov_v3kjxxC23R6l5em1VSoVZ8uPoHW9hN_686j8en0cpeU0sVpEop9WCMtLk_FWqpgnpTAZ-aq_wY8OjIT4SFy8-L1oGMk6stAjrtDnqn81P270tLx_s6rL08-W43ZzKaHEDLRPSJOtTQTGQbbAXq2XJ5IeEeifpPi2ErKr3V9UlPSdbBTlHavWCqL32KJRKRN20K-5Uby-48XjufNSVjaCxR2MdVedtXAX0GSuxV2HhjCBBi_QgrLzuQOzns9DT5L6nVwM6wu44COW7O2CbhMtT-eurU2zpfbyyLvQblszoPwfgkdXuZ1VG9FAq9h4sJorth43-quuz7cUk4z8c0ClyY9-C_g6qfYhluHxkFAXME3ev6RTjbz0-sa4yntbNLD4PKN3SY2PajLsW4veTJafN4gzF_aQq8uyKKObwntbseWtTBn0ArH8FJbCyIFFByRI5YyfSbeLxPrRq8N8Wz-j_xGnQW2BqHQ113ud4FqAtBupHAvTj43frDSkstVHf67oun0J4huP3AI', isFavorite: false },
    { id: 18, title: 'MacBook Pro 13" (M2)', description: 'MacBook Pro 13" с обновленным M2 чипом для профессионалов, это лучшее решение для работы в дороге.', imageUrl: 'https://yandex-images.clstorage.net/q48cVj217/175882bYtost/ZtpIcw7hI6z8aE67IdrqWDZ3Kps4c2E8pU44MHjsOv5mRwAxqup69H6vmHvePp53lRZ7H0aPIQeOSYSW-RO_SBLvzEbqkSP9uNjqeoEb6wz3oxvPGeMhSTWOjqOa7n34xIFy9k1oiwRLWr1vKrqPFAaH6_9g2wVE6Gq2g3x3uK-3SQshesODbwuqjrui-xhdRcXZHMqEsC2D2z1yyIx9mdfTEWQNinq1WvltTt0aLWUFYasOQNrEVYhL1IENFnr8F8qLQWpTk_-L6-w7kAup75bkaYyr5hOckekNcRi_P8vmkxDlPug6xrtIrxw_ee90x7M6H6NoBIdpiWdRfjR4PUVJKzMpUUO_2lvP-RG52ky2p5u8iYcwviOZ_yC4XT1qJlAylg_KeDVJqZ__nLjdFHZxyDwRKldViatHcz11-g5WGAoDWvLxn_vpjFuiuJmuN7Xov_v3kjxxC23R6l5em1VSoVZ8uPoHW9hN_686j8en0cpeU0sVpEop9WCMtLk_FWqpgnpTAZ-aq_wY8OjIT4SFy8-L1oGMk6stAjrtDnqn81P270tLx_s6rL08-W43ZzKaHEDLRPSJOtTQTGQbbAXq2XJ5IeEeifpPi2ErKr3V9UlPSdbBTlHavWCqL32KJRKRN20K-5Uby-48XjufNSVjaCxR2MdVedtXAX0GSuxV2HhjCBBi_QgrLzuQOzns9DT5L6nVwM6wu44COW7O2CbhMtT-eurU2zpfbyyLvQblszoPwfgkdXuZ1VG9FAq9h4sJorth43-quuz7cUk4z8c0ClyY9-C_g6qfYhluHxkFAXME3ev6RTjbz0-sa4yntbNLD4PKN3SY2PajLsW4veTJafN4gzF_aQq8uyKKObwntbseWtTBn0ArH8FJbCyIFFByRI5YyfSbeLxPrRq8N8Wz-j_xGnQW2BqHQ113ud4FqAtBupHAvTj43frDSkstVHf67oun0J4huP3AI', isFavorite: false },
    { id: 19, title: 'MacBook Pro 16" (M2)', description: 'Профессиональный MacBook Pro 16" с чипом M2 для сложных задач и высококлассного редактирования.', imageUrl: 'https://spb.aura-rent.ru/wp-content/uploads/2024/02/1-foto-2.png', isFavorite: false },
    { id: 20, title: 'MacBook Air 13"', description: 'Легкий и стильный MacBook Air 13" для повседневного использования с отличной производительностью.', imageUrl: 'https://yandex-images.clstorage.net/q48cVj217/175882bYtost/ZtpIcw7hI6z8aE67IdrqWDZ3Kps4c2E8pU44MHjsOv5mRwAxqup69H6vmHvePp53lRZ7H0aPIQeOSYSW-RO_SBLvzEbqkSP9uNjqeoEb6wz3oxvPGeMhSTWOjqOa7n34xIFy9k1oiwRLWr1vKrqPFAaH6_9g2wVE6Gq2g3x3uK-3SQshesODbwuqjrui-xhdRcXZHMqEsC2D2z1yyIx9mdfTEWQNinq1WvltTt0aLWUFYasOQNrEVYhL1IENFnr8F8qLQWpTk_-L6-w7kAup75bkaYyr5hOckekNcRi_P8vmkxDlPug6xrtIrxw_ee90x7M6H6NoBIdpiWdRfjR4PUVJKzMpUUO_2lvP-RG52ky2p5u8iYcwviOZ_yC4XT1qJlAylg_KeDVJqZ__nLjdFHZxyDwRKldViatHcz11-g5WGAoDWvLxn_vpjFuiuJmuN7Xov_v3kjxxC23R6l5em1VSoVZ8uPoHW9hN_686j8en0cpeU0sVpEop9WCMtLk_FWqpgnpTAZ-aq_wY8OjIT4SFy8-L1oGMk6stAjrtDnqn81P270tLx_s6rL08-W43ZzKaHEDLRPSJOtTQTGQbbAXq2XJ5IeEeifpPi2ErKr3V9UlPSdbBTlHavWCqL32KJRKRN20K-5Uby-48XjufNSVjaCxR2MdVedtXAX0GSuxV2HhjCBBi_QgrLzuQOzns9DT5L6nVwM6wu44COW7O2CbhMtT-eurU2zpfbyyLvQblszoPwfgkdXuZ1VG9FAq9h4sJorth43-quuz7cUk4z8c0ClyY9-C_g6qfYhluHxkFAXME3ev6RTjbz0-sa4yntbNLD4PKN3SY2PajLsW4veTJafN4gzF_aQq8uyKKObwntbseWtTBn0ArH8FJbCyIFFByRI5YyfSbeLxPrRq8N8Wz-j_xGnQW2BqHQ113ud4FqAtBupHAvTj43frDSkstVHf67oun0J4huP3AI', isFavorite: false },
  ],

  favoriteFilter: false,
  currentPage: 1, // Начальная страница
  productsPerPage: 10, // Товаров на страницу
  searchQuery: '',
  sortOption: '',
};


// Создаю slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<number>) {
      const productId = action.payload;
      const product = state.products.find(p => p.id === productId);
      if (product) {
        product.isFavorite = !product.isFavorite;
      }
    },
    createProduct(state, action: PayloadAction<Product>){
      const createdProduct = action.payload;
      state.products.push(createdProduct)
    },
    updateProduct(state, action: PayloadAction<Product>){
      const updateProduct = action.payload;
      state.products = state.products.map(product => product.id === updateProduct.id ? updateProduct : product)
    },
    removeProduct(state, action: PayloadAction<number>) {
      const productId = action.payload;
      state.products = state.products.filter(p => p.id !== productId)
      .map((product, index) => ({
          ...product,
          id: index + 1, // Пересчитываем id, что-бы не повторялись и не было пробелов
      }));
  },

    setFavoriteFilter(state, action: PayloadAction<boolean>) {
      state.favoriteFilter = action.payload;
    },

    //Пагинация типо
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },

    //Поиск в списке
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },

    setSortOption(state, action: PayloadAction<string>) {
      state.sortOption = action.payload;
    },

  },
});

// Экспортируем actionы
export const { toggleFavorite, removeProduct, setFavoriteFilter, setCurrentPage, updateProduct, setSearchQuery, createProduct, setSortOption} = productsSlice.actions;

// Создаем store
export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
  },
});

// Глобальные типы, уютненько/удобненько
export type RootState = ReturnType<typeof store.getState>

// Типы для dispatch, удобненько
export type AppDispatch = typeof store.dispatch