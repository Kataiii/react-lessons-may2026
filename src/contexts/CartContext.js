// 1. createContext - функция, для создания контекста с начальным значением
// 2. <Context.Provider value={}> - обертка для react-приложения и контекста, 
//    которая дает доступ до контекста и функции для работы с ним
// 3. useContext(Context) - хук, для того чтобы внутри компонента получать значения из контекста

import { createContext, useContext, useState } from "react";

const CartContext = createContext({
    items: [],
    total: 0
});

export const useCart = () => {
    const cart = useContext(CartContext);
    if(!cart) throw new Error("Контекст не подключен");
    return cart;
}

export const CartProvider = ({children}) => {
    const [items, setItems] = useState([]);

    const addItem = (product) => {
        setItems([...items, {...product, quantity: 1}]);
    }

    const deleteItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    }

    const updateItem = (id, quantity) => {
        const item = items.find(i => i.id === id);
        if(!item) return;
        setItems([...items.filter(item => item.id !== id), {...item, quantity}].sort((a,b) => a.id-b.id));
    }

    const total = items.reduce((sum, item) => sum + item.price*item.quantity, 0);

    return <CartContext.Provider value={{items, addItem, updateItem, deleteItem, total}}>
        {children}
    </CartContext.Provider>
}