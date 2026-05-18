import { useEffect } from "react";

const Card = ({index, id, name, sells, visitors}) => {

  useEffect(() => {
    console.log('Карточка появилась на сайте');

    const handleResize = () => console.log("Размер экрана ",window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      console.log('Карточка удаляется с сайта');
      window.removeEventListener('resize', handleResize);
    }
  }, [])

    return <div>
    <p>{`№${index + 1} ${name}`}</p>
    <p>Общее число покупок: {sells}</p>
    <p>Общее число посетителей: {visitors}</p>
  </div>
}

export default Card;