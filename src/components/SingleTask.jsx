import React, { useState } from 'react';

const SingleTask = ({ task, onEdit, onDelete, onComplete }) => {
  const [isChecked, setIsChecked] = useState(task.completed);

  const handleChange = (event) => {
    if (event.target.checked) {
      setIsChecked(true);
      onComplete();
    }
  };
  return (
    <div className=" flex flex-col rounded-lg border border-[#D0D5DD] p-4 gap-2 w-full ">
      <div className="flex items-center justify-between gap-4">
        {/* Title */}
        <h1 className="text-xl">{task.title}</h1>
        <div className="flex gap-2">
          {/* Edit */}
          <button className="w-6 h-6" onClick={onEdit}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          {/* Delete */}
          <button className="w-6 h-6" onClick={onDelete}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
      {/* Content */}
      <div className="flex flex-col items-center">
        <div className="text-sm text-[#667185] text-left">{task.content}</div>
      </div>

      {/* Completed */}
      <div className="flex items-center justify-between gap-4"></div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="completed"
          checked={isChecked}
          onChange={handleChange}
          id="completed"
          className="appearance-none h-5 w-5 rounded-md checked:bg-[#2563DC] border border-[#D0D5DD]"
        ></input>

        <p className="font-medium text-sm text-[#101928]">Completed</p>
      </div>
    </div>
  );
};

export default SingleTask;
