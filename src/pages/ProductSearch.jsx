import { memo, useCallback, useMemo, useState } from "react";

const products = [
  { id: 1, name: "Яблоко", price: 10 },
  { id: 2, name: "Груша", price: 20 },
  { id: 3, name: "Банан", price: 30 },
  { id: 4, name: "Мандарин", price: 50 },
  { id: 5, name: "Апельсин", price: 40 },
];

// Карточка обёрнута в memo и перерисовывается только при изменении пропсов
const ProductItem = memo(({ id, name, onSelect }) => {
  console.log("render ProductItem:", name);
  return (
    <div onClick={() => onSelect(id)} style={{ cursor: "pointer" }}>
      Продукт №{id}: {name}
    </div>
  );
});

export const ProductSearch = () => {
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(0);

  // useMemo фильтруем список только при изменении query
  const filtered = useMemo(() => {
    console.log("Фильтруем список...");
    return products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  // useCallback одна и та же ссылка на функцию, чтобы memo(ProductItem) не перерисовывал карточки зря
  const handleSelect = useCallback((id) => {
    console.log("Выбран продукт:", id);
  }, []);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск по названию"
      />

      <p>Счётчик: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1 к счётчику</button>

      {filtered.map((p) => (
        <ProductItem
          key={p.id}
          id={p.id}
          name={p.name}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
};
