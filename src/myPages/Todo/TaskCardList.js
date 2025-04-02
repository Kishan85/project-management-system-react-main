import React from 'react'
import TaskCard from './TaskCard';

const TaskCardList = ({data, setData, tasks, column }) => {
  return (
  <>
  {
   tasks.length > 0 ? (
       tasks.map((task, index) => {
         const card = data.task[task];
         return <TaskCard card={card} data={data} setData={setData} key={card.id} index={index} column={column} />;
       })
     ) : (
       <div className="kanban-drag"></div>
     ) 
  }
  </>
  )
}

export default TaskCardList;