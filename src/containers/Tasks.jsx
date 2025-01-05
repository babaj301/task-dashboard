import SingleTask from '../components/SingleTask';
import { auth } from '../firebase';
const Tasks = ({
  tasks,
  handleSearch,
  isAddModalOpen,
  setIsAddModalOpen,
  newTask,
  setNewTask,
  addTask,
  onSearchChange,
  handleDelete,
  loading,
}) => {
  const handleInputChange = (e) => {
    // Gets the name attribute and value attribute of the html element that triggered the event and destructure it.
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex gap-12 justify-between px-16 py-5 border-b w-full border-grey-200 text-base">
        <div className="flex min-w-[30%] max-w-[60%] px-4 rounded-md items-center border border-[#D0D5DD]">
          <input
            onChange={onSearchChange}
            className="w-full outline-none border-none border-[#D0D5DD] py-2 px-4"
            type="text"
            placeholder="Search"
          />
          <button onClick={handleSearch}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="flex gap-4 items-center">
          <p>{auth.currentUser?.displayName}</p>
          <img
            className="w-10 h-10 rounded-full"
            src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2"
            alt=""
          />
        </div>
      </div>

      <div className="flex px-16 pt-28 justify-between">
        <p className="text-2xl font-medium text-[#101928]">Tasks</p>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="text-base font-semibold bg-[#2563DC] text-[#FFFFFF] py-2 px-4 rounded-md"
        >
          New task +
        </button>
      </div>

      {/* Add Task Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Task</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <form onSubmit={addTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={newTask.title}
                  onChange={handleInputChange}
                  placeholder="Enter task title"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="content"
                  value={newTask.content}
                  onChange={handleInputChange}
                  placeholder="Enter task description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                {/* Select category */}
                <select
                  name="category"
                  value={newTask.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Tasks Section */}

      {/* Nested Ternary to handle the conditional rendering of the tasks section */}
      {loading ? (
        // Show spinner while loading
        <div className="flex flex-col justify-center items-center col-span-3 h-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          <div>Loading tasks</div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-2xl font-semibold text-[#101928]">
            You have no tasks
          </p>
        </div>
      ) : (
        <div className="p-5 gap-2 flex flex-col items-center ">
          {tasks.map((task) => (
            <SingleTask
              key={task.id}
              task={task}
              onEdit={() => console.log('edit', task.id)}
              onDelete={() => {
                handleDelete(task.id);
              }}
              onComplete={() => handleDelete(task.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
