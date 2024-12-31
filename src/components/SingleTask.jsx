import React from 'react';

const SingleTask = ({ taskObj, onEdit, onDelete }) => {
  return (
    <div className=" flex flex-col rounded-lg border border-[#D0D5DD] p-4 gap-2 w-full ">
      <div className="flex items-center justify-between gap-4">
        {/* Header */}
        <h1 className="text-xl">{taskObj.user}</h1>
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
      <div className="text-sm text-[#667185] text-left">{taskObj.content}</div>
    </div>
  );
};

export default SingleTask;
