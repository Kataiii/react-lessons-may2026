import { ProductCard } from "../components/ProductCard";
import { useCart } from "../contexts/CartContext";
import { selectCartItems } from "../store/selectors/cartSelectors";
import { useAddProductMutation, useGetProductByIdQuery, useGetProductsQuery } from "../store/services/productApi";
import { addToCart, removeFromCart } from "../store/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

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
  const dispatch = useAppDispatch();
  const itemsInStore = useAppSelector(selectCartItems);

  const {data: products = [], isLoading: isLoadingProducts, isError, error, isFetching, isSuccess} = useGetProductsQuery();
  // const {data = [], isLoading, isError, error, isFetching, isSuccess} = useGetProductByIdQuery(2);
  const addProduct = useAddProductMutation();

  const productInCart = (id: number) => {
    if (itemsInStore.find((item) => item.id === id)) return true;
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
            !productInCart(product.id)
              ? () => dispatch(addToCart(product))
              : undefined
          }
          onDelete={
            productInCart(product.id)
              ? () => dispatch(removeFromCart(product.id))
              : undefined
          }
        />
      ))}
    </div>
  );
};
