export type ProductCard = {
  id: number;
  name: string;
  previewUrl: string;
  price: number;
};

export type ProductPage = {
  id: number;
  name: string;
  previewUrl: string;
  price: number;

  description: string;
  images: string[];
  structure: string;
};

export type ProductCartCard = {
  id: number;
  name: string;
  previewUrl: string;
  price: number;

  quantity: number;
  test: string;
};

export type ProductCartCard1 = {
  id?: number;
  name?: string;
  previewUrl?: string;
  price?: number;

  quantity?: number;
  size?: string;
};

// Mapped Types
type PartialType<T> = {
  [P in keyof T]?: T[P];
};

type RequiredType<T> = {
  [P in keyof T]-?: T[P];
};

type ProductCartCardOption = Partial<ProductCartCard>;
type ProductCartCardOption1 = Required<ProductCartCardOption>;

// Utility Types
// 1. Partial - делает все поля необязательными (опциональными)
// 2. Required - делает все поля обязательными
// 3. Pick - создает новый тип на основе тех элементов, которые вы хотите использовать
// 4. Omit - создает новый тип, убирая все лишние поля

export type ProductPageUT = {
  id: number;
  name: string;
  previewUrl: string;
  price: number;

  description: string;
  images: string[];
  structure: string;
};

export type ProductCardUT = Pick<
  ProductPageUT,
  "id" | "name" | "previewUrl" | "price"
>;
export type ProductCartCardUT = Omit<
  ProductPageUT,
  "description" | "images" | "structure"
> & {
  quantity: number;
};

// quantity_test -> quantityTest

// Стейт-менеджеры - библиотеки для работы с глобальным состоянием
// 1. Атомарные (Jotai)
// const themeAtom = createAtom('light');
// const [theme, setTheme] = useAtom(themeAtom);

// 2. Реактивные (Mobx) -> ООП -> Класс
// reaction

// 3. Redux (Redux Toolkit/RTK)
