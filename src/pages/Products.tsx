import { ProductCard } from "../components/ProductCard";
import { useCart } from "../contexts/CartContext";

const products = [
  {
    id: 1,
    name: "Яблоко",
    price: 10,
  },
  {
    id: 2,
    name: "Груша",
    price: 20,
  },
  {
    id: 3,
    name: "Банан",
    price: 30,
  },
  {
    id: 4,
    name: "Мандарин",
    price: 50,
  },
];

export const Products = () => {
  const { items, addItem, deleteItem } = useCart();

  const productInCart = (id: number) => {
    if (items.find((item) => item.id === id)) return true;
    return false;
  };

  return (
    <div>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          onAdd={
            !productInCart(product.id) ? () => addItem(product) : undefined
          }
          onDelete={
            productInCart(product.id) ? () => deleteItem(product.id) : undefined
          }
        />
      ))}
    </div>
  );
};
