import { useEffect } from "react";

type CardProps = {
  index: number;
  id: number;
  name: string;
  sells: number;
  visitors: number;
};

const Card: React.FC<CardProps> = ({ index, id, name, sells, visitors }) => {
  useEffect(() => {
    console.log("Карточка появилась на сайте");

    const handleResize = () => console.log("Размер экрана ", window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      console.log("Карточка удаляется с сайта");
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <p>{`№${index + 1} ${name}`}</p>
      <p>Общее число покупок: {sells}</p>
      <p>Общее число посетителей: {visitors}</p>
    </div>
  );
};

export default Card;
