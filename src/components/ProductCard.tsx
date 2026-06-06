type ProductCardProps = {
  id: number;
  name: string;
  onAdd?: VoidFunction;
  onDelete?: VoidFunction;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  onAdd,
  onDelete,
}) => {
  return (
    <div>
      <p>Продукт №{id}</p>
      <p>{name}</p>
      {onAdd && <button onClick={onAdd}>Добавить в корзину</button>}
      {onDelete && <button onClick={onDelete}>Удалить из корзины</button>}
    </div>
  );
};
