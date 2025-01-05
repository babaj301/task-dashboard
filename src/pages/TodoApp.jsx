import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import SideBar from '../containers/SideBar';
import Tasks from '../containers/Tasks';

const TodoApp = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [tasks, setTasks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    content: '',
    title: '',
    completed: false,
    category: 'work',
  });

  const handleTabChange = (tab) => setSelectedTab(tab);

  const handleExit = () => console.log('exit');

  useEffect(() => {
    // Function to listen for changes and stops running when the component unmounts
    const handleStateListener = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userId = user.uid;
          const taskRef = collection(db, 'users', userId, 'tasks');
          const data = await getDocs(taskRef);

          if (selectedTab === 'all') {
            const tasks = data.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setTasks(tasks);
          }

          // Sets the tasks for work
          if (selectedTab === 'work') {
            const tasks = data.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            const workTasks = tasks.filter((task) => task.category === 'work');

            setTasks(workTasks);
          }

          //Set the tasks for personal
          if (selectedTab === 'personal') {
            const tasks = data.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            const personalTasks = tasks.filter(
              (task) => task.category === 'personal'
            );
            setTasks(personalTasks);
          }

          setLoading(false);
        } catch (error) {
          console.error('Error fetching tasks: ', error);
        }
      } else {
        console.log('No user logged in');
        setTasks([]);
      }
    });

    return () => handleStateListener();
  }, [selectedTab]);

  const searchInput = (e) => {
    const searchQuery = e.target.value;
    setSearchText(searchQuery);

    console.log(searchQuery);
    setSearchText('');
  };

  const handleSearch = () => {
    console.log(searchText);
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
    <div className="flex h-screen">
      <SideBar
        onTabChange={handleTabChange}
        handleExit={handleExit}
        selectedTab={selectedTab}
      />
      <Tasks
        tasks={tasks}
        onSearchChange={searchInput}
        handleSearch={handleSearch}
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
        handleDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
};

export default TodoApp;
