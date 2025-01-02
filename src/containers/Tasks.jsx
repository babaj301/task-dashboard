import { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

import SingleTask from '../components/SingleTask';
const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    content: '',
    title: '',
    completed: false,
    category: 'work',
  });

  // Find out who is logged in and Get all the tasks for that person
  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     const user = auth.currentUser;
  //     if (user) {
  //       try {
  //         const userId = user.uid;
  //         const taskRef = collection(db, 'users', userId, 'tasks');
  //         const data = await getDocs(taskRef);

  //         setTasks(
  //           data.docs.map((doc) => ({
  //             ...doc.data(),
  //             id: doc.id,
  //           }))
  //         );
  //       } catch (error) {
  //         console.error('Error fetching tasks: ', error);
  //       }
  //     } else {
  //       console.log('No user logged in');
  //     }
  //   };

  //   fetchTasks();
  // }, []);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userId = user.uid;
          const taskRef = collection(db, 'users', userId, 'tasks');
          const data = await getDocs(taskRef);

          setTasks(
            data.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
          );
        } catch (error) {
          console.error('Error fetching tasks: ', error);
        }
      } else {
        console.log('No user logged in');
        setTasks([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Show tasks
  console.log(tasks);

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setSearchText(searchQuery);
    console.log(searchText);
  };

  // Filter tasks to use in search
  // const filteredTasks = tasks.filter((task) => {
  //   return task.title.toLowerCase().includes(searchText);
  // });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const addTask = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (user) {
      try {
        const userId = user.uid;
        const taskData = {
          name: user.displayName,
          content: newTask.content,
          title: newTask.title,
          completed: false,
          category: newTask.category,
        };

        const docRef = await addDoc(
          collection(db, 'users', userId, 'tasks'),
          taskData
        );

        setTasks((prev) => [...prev, { id: docRef.id, ...taskData }]);
        setNewTask({
          content: '',
          title: '',
          completed: false,
          category: 'work',
        });

        setIsAddModalOpen(false);
      } catch (error) {
        console.error('Error adding task: ', error);
      }
    } else {
      console.log('No user logged in');
    }
  };

  const handleDelete = async (id) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const taskRef = doc(db, 'users', user.uid, 'tasks', id);
        await deleteDoc(taskRef);
        setTasks(tasks.filter((task) => task.id !== id));
      } catch (error) {
        console.error('Error deleting task: ', error);
      }
    }
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
          <p>{auth.currentUser.displayName}</p>
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
        {/* Add task button */}
        <div className="flex gap-4">
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
      </div>

      {/* Tasks list */}
      {tasks.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-2xl font-semibold text-[#101928]">
            You have no tasks
          </p>
        </div>
      ) : (
        <div className="p-5 gap-9 grid grid-cols-3 ">
          {tasks.map((task) => (
            <SingleTask
              key={task.id}
              taskObj={task}
              onEdit={() => console.log('edit', task.id)}
              onDelete={() => {
                handleDelete(task.id);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
