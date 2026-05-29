import { memo, useCallback, useMemo, useState } from "react";

const Child = memo(({ title, onClick }) => {
  console.log("render child", title);

  return <button onClick={onClick}>{title}</button>;
});

const slowCalc = (num) => {
  console.log("slow calculastion start");
  let res = 0;
  for (let i = 0; i < 100000000; i++) {
    res += num;
  }
  return res;
};

export const Perfomance = () => {
  const [counter, setCounter] = useState(0);
  const [num, setNum] = useState(1);

  const total = useMemo(() => slowCalc(num), [num]);

  const handleChildClick = useCallback(() => {
    console.log("Клик по дочерней кнопке");
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <p>Счетчик {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>+1</button>
      <p>Число {total}</p>
      <button onClick={() => setNum(num + 1)}>Изменить число</button>
      <Child title={"Child button"} onClick={handleChildClick} />
    </div>
  );
};
