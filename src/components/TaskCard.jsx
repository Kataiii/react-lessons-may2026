const TaskCard = ({id, title, description, isDone, onCheck}) => {
    return <div style={{display: 'flex', gap: 5, alignItems: 'center'}}>
        <div>
        <p>{`№${id} | ${title}`}</p>
        <p>{description}</p>
        </div>
        <input type='checkbox' checked={isDone} onChange={(e) => onCheck(id, e.target.checked)}/>
    </div>
}

export default TaskCard;