import React, { useState } from 'react';

interface Task {
  id?: string;
  category: string;
  completed: boolean;
  content: string;
  name?: string | null;
  title: string;
}

interface SingleTaskProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onComplete: () => void;
}

const SingleTask = ({
  task,
  onEdit,
  onDelete,
  onComplete,
}: SingleTaskProps) => {
  const [isChecked, setIsChecked] = useState(task.completed);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.checked) {
      setIsChecked(true);
      onComplete();
    }
  };
  return (
    <div className="flex flex-col justify-evenly text-left rounded-lg shadow-md border border-[#2563DC] px-4 py-2 gap-2 w-full md:w-[90%] lg:w-[85%] mt-4">
      <div className="flex items-center justify-between gap-4">
        {/* Title */}
        <h1 className="text-base text-[#14367B]  text- flex gap-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="completed"
              checked={isChecked}
              onChange={handleChange}
              id="completed"
              className="appearance-none h-5 w-5 shadow-md rounded-md checked:bg-[#2563DC] border border-[#D0D5DD]"
            />
          </div>
          <span className="block lg:hidden">{task.title}s</span>
          <span className="hidden lg:block">{task.title}</span>
        </h1>
        <div className="flex gap-2">
          {/* Edit */}
          <button className="w-6 h-6 flex-shrink-0" onClick={onEdit}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          {/* Delete */}
          <button className="w-6 h-6 flex-shrink-0" onClick={onDelete}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
      {/* Content */}
      <div className="flex flex-col justify-center">
        <p className="text-xs text-[#000] ">
          <span className="hidden lg:block">{task.content}</span>
          <span className="block md:hidden">{task.content.slice(0, 20)}</span>
          <span className="md:block hidden lg:hidden">
            {task.content.slice(0, 40)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SingleTask;
