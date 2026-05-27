import { useState } from "react";

const TaskCard = ({id, title, description, isDone, onCheck, onClick, onDelete, onUpdate}) => {
    const [data, setData] = useState();

    return <div style={{display: 'flex', gap: 5, alignItems: 'center'}} onClick={onClick}>
        <div>
        <p>{`№${id} | ${title}`}</p>
        <p>{description}</p>
        </div>
        <input type='checkbox' checked={isDone} onChange={(e) => onCheck(id, e.target.checked)}/>
        <button onClick={onUpdate}>Обновление заголовка</button>
        <button onClick={onDelete}>Удалить задачу</button>
    </div>
}

export default TaskCard;