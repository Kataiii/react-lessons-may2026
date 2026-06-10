// RTK Query

// fetch
// axios
// RTK Query

// FETCH
// Плюсы:
// - Запросы отправляются
// - Нет зависимостей
// Минусы:
// 1. Дважды обрабатывать ответ
// 2. Общая конфигурация запросов отсутствует (один url, общий набор headers)
// 3. Отмена запросов вручную
// 4. Вручную делаем обработку ошибок и состояние загрузки, обновление данных, кеширование

// AXIOS
// Плюсы:
// 1. Сам разворачивает ответ в объект
// 2. Общая конфигурация есть
// 3. Интерцепторы - перехватчики запросов (добавление токенов из стора всем запросам,
// если токен протух, то делаем перезапрос, а не выбиваем пользователя из приложения)
// Минусы:
// 1. Отмена запросов вручную
// 2. Вручную делаем обработку ошибок и состояние загрузки, обновление данных, кеширование

// Обновляете продукт (скидка) => PATCH на сервер => успешный ответ =>
// GET на продукты, чтобы увидеть примененная скидка

// RTK QUERY
// Минусы:
// - отдельная бибилиотека (избыточно)

// Плюсы:
// 1. Сам разворачивает ответ в объект
// 2. Общая конфигурация есть
// 3. Можно настроить кеширование
// 4. Можно включить автоматическую отмену запросов
// 5. Система тегов, чтобы сделать автоматический перезапрос на GET
// 6. Получаем хуки, в которых лежит состояние запроса (isLoading, error)
// 7. Кодогенерация (из swagger)
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

type Product = {
  id: number;
  name: string;
  price: number;
};

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState).auth.token;
    //   if (token) headers.set("Authorization", `Bearer ${token}`);

    //   return headers;
    // },
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
      providesTags: ["Product"],
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),
    addProduct: builder.mutation<Product, Omit<Product, "id">>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});
// Мутация -> инвалидирует -> запросы (GET) видят, что тег не валидный -> отправляют новый GET запрос

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
} = productApi;
