import React, { useState } from 'react';

type Task = {
  id?: number;
  category: string;
  completed: boolean;
  content: string;
  name: string;
  title: string;
};

interface CompletedTaskProps {
  task: Task;
  onComplete: () => void;
  revertComplete: () => void;
}

const CompletedTask = ({
  task,

  onComplete,
  revertComplete,
}: CompletedTaskProps) => {
  const [isChecked, setIsChecked] = useState(task.completed);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!event.target.checked) {
      setIsChecked(event.target.checked);
      revertComplete();
    }

    if (event.target.checked) {
      setIsChecked(event.target.checked);
      onComplete();
    }
  };
  return (
    <div className="flex flex-col justify-evenly text-left rounded-lg shadow-md border border-[#2563DC] px-4 py-2 gap-2 w-full md:w-[90%] lg:w-[85%] mt-4">
      <div className="flex items-center justify-between gap-4">
        {/* Title */}
        <h1
          className={
            isChecked
              ? 'line-through text-base text-[#14367B] text-ellipsis flex gap-2'
              : 'text-base text-[#14367B] text-ellipsis flex gap-2'
          }
        >
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
          <span className="block lg:hidden">{task.title}</span>
          <span className="hidden lg:block">{task.title}</span>
        </h1>
      </div>
      {/* Content */}
      <div
        className={
          isChecked
            ? `line-through flex flex-col justify-center`
            : 'flex flex-col justify-center'
        }
      >
        <p className="text-xs text-[#000] truncate">
          <span className="hidden lg:block">{task.content}</span>
          <span className="block md:hidden">{task.content}</span>
          <span className="md:block hidden lg:hidden">{task.content}</span>
        </p>
      </div>
    </div>
  );
};

export default CompletedTask;
