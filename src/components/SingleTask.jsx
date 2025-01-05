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
    // <div className=" flex flex-col justify-evenly text-left rounded-lg shadow-md border border-[#2563DC] p-4 gap-4 w-[85%] md:w-[90%] mt-4 ">
    //   <div className="flex items-center justify-between gap-4">
    //     {/* Title */}
    //     <h1 className="text-xl text-[#14367B]">
    //       <span className="hidden lg:hidden md:hidden">{task.title}</span>
    //       <span className="lg:block hidden">{`${
    //         task.title.split(' ')[0]
    //       }...`}</span>

    //       <span className="md:block hidden lg:hidden">{`${
    //         task.title.split(' ')[0]
    //       }...`}</span>
    //     </h1>
    //     <div className="flex gap-2">
    //       {/* Edit */}
    //       <button className="w-6 h-6" onClick={onEdit}>
    //         <i className="fa-solid fa-pen-to-square"></i>
    //       </button>
    //       {/* Delete */}
    //       <button className="w-6 h-6" onClick={onDelete}>
    //         <i className="fa-solid fa-trash"></i>
    //       </button>
    //     </div>
    //   </div>
    //   {/* Content */}
    //   <div className="flex flex-col justify-center">
    //     <p className="text-sm text-[#000]">
    //       <span className="hidden lg:block">{task.title}</span>
    //       <span className="block md:hidden">{`${task.content.slice(
    //         0,
    //         20
    //       )}...`}</span>
    //       <span className="md:block hidden lg:hidden">{`${task.content.slice(
    //         0,
    //         20
    //       )}...`}</span>
    //     </p>
    //   </div>

    //   {/* Completed */}
    //   <div className="flex items-center gap-2">
    //     <input
    //       type="checkbox"
    //       name="completed"
    //       checked={isChecked}
    //       onChange={handleChange}
    //       id="completed"
    //       className="appearance-none h-5 w-5 shadow-md rounded-md checked:bg-[#2563DC] border border-[#D0D5DD]"
    //     ></input>

    //     <p className="font-medium text-sm text-[#14367B]">Completed</p>
    //   </div>
    // </div>
    <div className="flex flex-col justify-evenly text-left rounded-lg shadow-md border border-[#2563DC] p-4 gap-4 w-full md:w-[90%] lg:w-[85%] mt-4">
      <div className="flex items-center justify-between gap-4">
        {/* Title */}
        <h1 className="text-xl text-[#14367B] truncate text-ellipsis">
          <span className="block lg:hidden">{task.title.slice(0, 20)}...</span>
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
        <p className="text-sm text-[#000] truncate">
          <span className="hidden lg:block">{task.content}</span>
          <span className="block md:hidden">
            {task.content.slice(0, 20)}...
          </span>
          <span className="md:block hidden lg:hidden">
            {task.content.slice(0, 40)}...
          </span>
        </p>
      </div>
      {/* Completed */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="completed"
          checked={isChecked}
          onChange={handleChange}
          id="completed"
          className="appearance-none h-5 w-5 shadow-md rounded-md checked:bg-[#2563DC] border border-[#D0D5DD]"
        />
        <p className="font-medium text-sm text-[#14367B]">Completed</p>
      </div>
    </div>
  );
};

export default SingleTask;
