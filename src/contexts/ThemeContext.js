import { createContext, useContext, useEffect, useState } from "react";

// UI -> ThemeContext -> localStorage

const ThemeContext = createContext({theme: 'light'});

export const useTheme = () => {
    const theme = useContext(ThemeContext);
    if(!theme) throw new Error("Контекст не подключен");
    return theme;
}

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(() => {
        const themeInStorage = localStorage.getItem('theme');
        if(themeInStorage) return themeInStorage;
        return 'light';
    })

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme])

    const toogleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light')

    return <ThemeContext.Provider value={{theme, toogleTheme, setTheme}}>
        {children}
    </ThemeContext.Provider>
}


// JavaScript - интерпретируемый язык (Браузер, nodejs)
// ECMAScript (ES6, ES5)

// Динамическая типизация (строгая типизация - Java, C#)
// int number1 = 0;
// number1 = 'qwerty'; // строготипизированные языки выдают ошибку

let x = 5;
x = "hello";
// Всего зачислено: undefined руб.

// Проблемы:
// 1. Сложность поиска ошибок
// 2. Сложность поддержки кода
// 3. Код не является самодокументируемым (JS-doc)

//Слабая типизация - язык использует неявное приведение типов
console.log(5 - '3'); // 2   5 - 3 = 2
console.log(5 + '3'); // 53  (конкатенация)

// Typescript - решает проблемы описанные выше - надстройка над JavaScript
// Typescript -> делается сборка (typescript компилируется в javascript) -> Проект на Javascript

// Typescript - статическая типизация
//let x1: number = 5; // явная типизация
//x1 = "hello"; // ts выкинет ошибку
//let sum = 0; // неявная типизация (выводимая) работает только при присвоении значения

// Стурктурная типизация
// interface Point {
//     x: number;
//     y: number;
// }

// function printPoint(point: Point) {
//     console.log(point.x + " " +point.y);
// }

// const myPoint = {x: 10, y: 5, z: 10};
// printPoint(myPoint);

// Номенклатурная типизация - типизация по имени класса и интерфейса (Java, C#)
// class Cat {
//     name: string;
//     age: number;
// }

// class Dog {
//     name: string;
//     age: number;
// }

// Dog dog = new Cat(); //ошибка Java, C#


// Объединение
// type ID = string | number;
// let id1: ID = 10;
// let id2: ID = 'qwerty';
// let id3: ID = -5;
// let id4: ID = '-5';
// let id5: ID = true; // ts будет выдавать ошибку

// type User = {} | null;

// // Пересечение
// type Person = {name: string};
// type Address = {city: string};
// type PersonWithAddress = Person & Address;

// const pa: PersonWithAddress = {name: 'Ваня', city: 'Саратов'}; // Правильно
// const pa1: PersonWithAddress = {name: 'Ваня'}; // Не правильно

// type Test = string & number; // пустое множество (таких значений не бывает)

// JavaScript
// Примитивные типы:
// 1. string
// 2. number
// 3. boolean 
// 4. undefined
// 5. null
// 6. Symbol (char)
// 7. BigInt

// Ссылочные типы:
// Объекты, массивы, функции

// Специальные типы (надтипы, подтипы)
// 1. any - отключает проверку типов
// let a: any = 10;
// a = 'string';
// a = {city: 'Саратов'};

// 2. unknown - аналог any, но безопасный
// let a: unknown = 5;
// a = 'string';

// 3. void - ничего не возвращает

// 4. never - пустое множество
// type Status = 'loading' | 'success' | 'error' | 'default' | 'waiting';
// function getStatus(status: Status) {
//     switch(status){ 
//         case 'loading':
//         case 'success':
//         case 'error':
//         default:
//             // 'default' | 'waiting'
//             let test: never = status; // ts выкинет ошибку
//     }
// }

// Любой файл, где есть react-компонент - расширение .tsx (.jsx)
// Остальные файлы могут быть (с функциями и типами) - .ts (.js)

// const getTaskById = (id: number, name: string) => {

// }

// const addTask = (taskDto: {name: string, description: string}) => {

// }

// interface TaskDtoInterface {
//     name: string;
//     description: string;
// }

// interface TaskDtoInterface {
//     test: string;
// }

// const test: TaskDtoInterface // name, description, test

// interface TaskDtoInterface1 extends TaskDtoInterface {
//     newField: string;
// }

// type TaskDtoType = {
//     name: string;
//     description: string;
// }

// const addTask1 = (taskDto: TaskDtoInterface): string => {

// }

// Интерфейсы: работают только с объектами, могут объединять поля по одинаковому названию, расширение через extends
// Типы: работают с любым типом данным (объекты, примитивы), при одинаковом названии выдают ошибку, | и &


// Переменных и функций
// Хуки
// const [count, setCount] = useState<number | string>();
// Компоненты
// События

// Enum - перечисления
// enum Direction {
//     Up = 'Up',
//     Down = 'Down',
//     Left = 'Left',
//     Right = 'Right'
// }

// Direction.Up

// Дженерики - обобщенные типы
// function identity<T extends  {length: number}>(arg: T): T {
//     return arg;
// }

// let output = identity<string>('hello'); // работать будет
// let output1 = identity(42); // работать не будет
// let output2 = identity<boolean>(false); // работать не будет

// let output3 = identity<Array<number>>([1,2,3]); // работать будет

// Условные типы
// Сужение типов и type guard (typeof (для притимивных), instanceof (проверка по принадлежности к классу), 
// in (проверка по полю))
// keyof 
// keyof Person - "name" | "age"
// Mapped types (utility types)


// Задания
// 1. Создать компонент StatusBadge, который принимает пропсы status: 'active' | 'pending' | 'error', text 
// рендерится цветной бейджик
// 2. Компонент UserCard принимает пропсы user (объект с набором полей name, email, role: 'admin' | 'user'), 
// onDelete. Если у пользователя роль = user, то мы кнопку удаления показываем, и если админ, то кнопка 
// не показывается