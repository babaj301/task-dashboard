import { useEffect, useState } from 'react';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [searchText, setSearchText] = useState('');

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       const response = await fetch('/tasks');
  //       const data = await response.json();
  //       setTasks(data);
  //     } catch (error) {
  //       console.error('Error fetching tasks:', error);
  //     }
  //   };

  //   fetchTasks();
  // }, [tasks]);

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setSearchText(searchQuery);
    console.log(searchText);
  };

  const addTask = () => {
    console.log('task added');
  };

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Navbar */}
      <div className="flex gap-12 justify-between px-16 py-5 border-b w-full border-grey-200 text-base">
        <div className="flex min-w-[30%] max-w-[60%] px-4  rounded-md items-center border border-[#D0D5DD]">
          {/* Search bar */ ' '}
          <input
            onChange={handleSearch}
            className=" w-full outline-none border-none border-[#D0D5DD] py-2 px-4"
            type="text"
            placeholder="Search"
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>

        {/* Profile */}
        <div className="flex gap-4 items-center">
          <p>Oluwaferanmi</p>
          <img
            className="w-10 h-10 rounded-full"
            src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
            alt=""
          />
        </div>
      </div>

      {/* Tasks */}
      <div className="flex px-16 pt-28 justify-between">
        <p className="text-2xl font-medium text-[#101928]">Tasks</p>

        <div className="flex gap-4">
          <button
            onClick={addTask}
            className="text-base font-semibold bg-[#2563DC] text-[#FFFFFF] py-2 px-4 rounded-md"
          >
            New task +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
