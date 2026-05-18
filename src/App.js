import { useEffect, useState } from "react";
import Card from "./components/Card";
import TaskCard from "./components/TaskCard";

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [showCard, setShowCard] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Создается компонент (создается переменные, useState) -> Монтирование в Dom-дерево -> вызов useEffect

  // Вызов cleanup-функции -> удаление компонента из DOM-дерева

  useEffect(() => {
    const tasksLocalStorage = localStorage.getItem('tasks');

    setTimeout(() => {
      if(!tasksLocalStorage) {
        // Цепочка then
        fetch('https://9f71319c30fc7a13.mokky.dev/tasks')
        .then(res => {
          if(!res.ok) throw new Error('Произошла ошибка при получении задач');
          return res.json();
        })
        .then(data => {
          console.log("Данные пришли ", data)
          setTasks(data)
        })
        .catch(error => console.log("Ошибка ",error))
        }
        else setTasks(JSON.parse(tasksLocalStorage));
        setIsLoading(false);
    }, 2000)
    
    // Promise - объект, который хранит своё состояние
    // pending - ожидание
    // fullfiled - успешно
    // rejected - ошибка

    // const response = fetch('https://9f71319c30fc7a13.mokky.dev/tasks');
    // 1. Цепочка then
    // 2. async/await

    // const fetchTasks = async () => {
    //   try {
    //     const res = await fetch('https://9f71319c30fc7a13.mokky.dev/tasks');
    //     if(!res.ok) throw new Error('Произошла ошибка при получении задач');
    //     const data = await res.json();
    //     setTasks(data);
    //   } catch (error) {
    //     console.log("Ошибка ",error)
    //   }
    // }

    // //axios
    // fetchTasks();
  }, [])



  useEffect(() => {
    console.log("Задания обновились");
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks])
  // useEffect - без массива зависимостей - неудобный - update
  // useEffect(() => {
  //   console.log('Вызываюсь каждый раз, когда что-то обновляется');
  // })

  // useEffect - с пустым массивом зависимостей - mount (1 раз, в самом начале)
  // useEffect(() => {
  //   console.log('Вызываюсь один раз, после того как компонент появится в DOM')

  //   // cleanup-функция - unmount
  //   return () => {
  //     console.log('Компонент размонтируется')
  //   }
  // }, [])

  // useEffect - с массивом зависимостей - update (каждый раз когда будет обновляться count)
  // useEffect(() => {
  //   console.log('Счетчик Вызываюсь, count обновился ',count);
  // }, [count])

  // // useEffect - с массивом зависимостей - update (каждый раз когда будет обновляться text)
  // useEffect(() => {
  //   console.log('Вызываюсь, text обновился ', text);
  // }, [text])

  // useEffect(() => {
  //   console.log("Что-то изменилось")
  // }, [count, text])

  const handleClick = () => {
    setCount(count+1);
  }

  const handleCheck = (id, value) => {
    console.log(id);
    console.log(value);

    const task = tasks.find(task => task.id === id);
    if(!task) return;

    setTasks(prev => [...prev.filter(task => task.id !== id), {...task, isDone: value}].sort((a,b) => a.id - b.id))
  } 

  return <div>
    {/* <p>Счетчик: {count}</p>
    <button onClick={handleClick}>Увеличить счетчик</button>

    <p>Текстовое поле</p>
    <input type='text' placeholder="Введите текст" onChange={(e) => setText(e.target.value)}/>

    <button onClick={() => setShowCard(prev => !prev)}>Кнопка</button>
    {showCard && <Card index={1} id={1} name={'Карточка'} sells={5000} visitors={500}/>} */}
    <p>Лист задачек</p>
    {isLoading
    ? <p>Подожите, пожалуйста, данные грузятся...</p>
    : <div>
        {!tasks.length //tasks.lenght === 0
        ? <p>Задач нет</p>
        : tasks.map(task => <TaskCard 
          key={task.id} 
          id={task.id} 
          title={task.title} 
          description={task.description} 
          isDone={task.isDone}
          onCheck={handleCheck}
        />)}
      </div>
    }
    
  </div>
}

export default App;

// Если есть todo-list
// (начальное значение у useState - пустой массив)
// Добавьте useEffect, который сохраняет массив задач в localStorage при каждом изменении.
// При монтировании загружайте задачи из localStorage
// localStorage.setItem('ключ', значение)
// localStorage.getItem('ключ')

// Создайте компонент MouseTracker, который выводит координаты курсора. Используйте useEffect для подписки на mousemove.

// Создайте компонент DocumentTitleTracker.
// • Он принимает проп title.
// • С помощью useEffect обновляет document.title при изменении пропа.
// • Добавьте console.log в эффект и в cleanup, чтобы увидеть порядок вызовов при изменении пропа и размонтировании.