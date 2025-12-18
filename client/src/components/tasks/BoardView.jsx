import React from "react";
import TaskCard from "./TaskCard";

const BoardView = ({ tasks }) => {
  // Group tasks by stage
  const todoTasks = tasks?.filter(task => task.stage === "todo") || [];
  const inProgressTasks = tasks?.filter(task => task.stage === "in progress") || [];
  const completedTasks = tasks?.filter(task => task.stage === "completed") || [];

  return (
    <div className='w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10'>
      {/* TODO Column */}
      <div className='flex flex-col gap-4'>
        <h3 className='text-lg font-semibold text-gray-700 px-2'>To Do ({todoTasks.length})</h3>
        {todoTasks.map((task, index) => (
          <TaskCard task={task} key={index} />
        ))}
      </div>

      {/* IN PROGRESS Column */}
      <div className='flex flex-col gap-4'>
        <h3 className='text-lg font-semibold text-gray-700 px-2'>In Progress ({inProgressTasks.length})</h3>
        {inProgressTasks.map((task, index) => (
          <TaskCard task={task} key={index} />
        ))}
      </div>

      {/* COMPLETED Column */}
      <div className='flex flex-col gap-4'>
        <h3 className='text-lg font-semibold text-gray-700 px-2'>Completed ({completedTasks.length})</h3>
        {completedTasks.map((task, index) => (
          <TaskCard task={task} key={index} />
        ))}
      </div>
    </div>
  );
};

export default BoardView;
