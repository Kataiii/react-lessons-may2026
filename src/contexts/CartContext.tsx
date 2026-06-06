// 1. createContext - функция, для создания контекста с начальным значением
// 2. <Context.Provider value={}> - обертка для react-приложения и контекста,
//    которая дает доступ до контекста и функции для работы с ним
// 3. useContext(Context) - хук, для того чтобы внутри компонента получать значения из контекста

// Если с контекстом сстановится тяжело -> стейт-менеджер (Jotai, Zustand, Mobx, Redux (RTK))

import { createContext, ReactNode, useContext, useState } from "react";

type Product = {
  id: number;
  price: number;
};

type CartProduct = Product & {
  quantity: number;
};

type CartContextType = {
  items: CartProduct[];
  total: number;
  addItem: (product: Product) => void;
  updateItem: (id: number, quantity: number) => void;
  deleteItem: (id: number) => void;
};

type CartProviderType = {
  children: ReactNode;
};

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("Контекст не подключен");
  return cart;
};

export const CartProvider = ({ children }: CartProviderType) => {
  const [items, setItems] = useState<CartProduct[]>([]);

  const addItem = (product: Product) => {
    setItems([...items, { ...product, quantity: 1 }]);
  };

  const deleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: number, quantity: number) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    setItems(
      [...items.filter((item) => item.id !== id), { ...item, quantity }].sort(
        (a, b) => a.id - b.id
      )
    );
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, updateItem, deleteItem, total }}
    >
      {children}
    </CartContext.Provider>
  );
};
