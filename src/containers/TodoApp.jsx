import React, { useState, useEffect, useCallback } from 'react';
import { db, auth } from '../firebase';
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import SideBar from '../containers/SideBar';
import Tasks from '../containers/Tasks';
import { useNavigate } from 'react-router-dom';

// All the states
const TodoApp = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [tasks, setTasks] = useState([]);
  // const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    content: '',
    title: '',
    completed: false,
    category: 'work',
  });

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskContent, setNewTaskContent] = useState('');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  const navigate = useNavigate();

  const handleTabChange = (tab) => setSelectedTab(tab);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setTimeout(() => {
        navigate('/');
      }, 2000);
      console.log('User succesfully logged out');
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  const fetchTasks = useCallback(async () => {
    const user = auth.currentUser;
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

          workTasks ? setTasks(workTasks) : setTasks([]);
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
          personalTasks ? setTasks(personalTasks) : setTasks([]);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks: ', error);
      }
    } else {
      console.log('No user logged in');
      setTasks([]);
    }
  }, [selectedTab]);

  useEffect(() => {
    // Function to listen for changes and stops running when the component unmounts
    const handleStateListener = onAuthStateChanged(auth, async (user) => {
      fetchTasks();
    });

    return () => handleStateListener();
  }, [selectedTab, fetchTasks]);

  const searchInput = (e) => {
    const searchQuery = e.target.value;

    console.log(searchQuery);
  };

  const handleSearch = () => {};

  // Adds a new task
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

  // Deletes the task
  const handleDeleteClick = (task) => {
    setIsDeleteModalOpen(true);
    setDeletingTaskId(task.id);
  };
  const handleDelete = async () => {
    const user = auth.currentUser;
    const id = deletingTaskId;
    if (user) {
      try {
        const taskRef = doc(db, 'users', user.uid, 'tasks', id);
        await deleteDoc(taskRef);
        // setTasks(tasks.filter((task) => task.id !== id));
        fetchTasks();
      } catch (error) {
        console.error('Error deleting task: ', error);
      } finally {
        setIsDeleteModalOpen(false);
        setDeletingTaskId(null);
      }
    }
  };

  const cancelDelete = () => {
    setDeletingTaskId(null);
    setIsDeleteModalOpen(false);
  };

  // Handles what becomes the content of the edited task
  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setNewTaskTitle(task.title);
    setNewTaskContent(task.content);
  };

  // Save the edited task
  const handleEditSave = async () => {
    const user = auth.currentUser;

    const id = editingTaskId;

    try {
      await updateDoc(doc(db, 'users', user.uid, 'tasks', id), {
        title: newTaskTitle,
        content: newTaskContent,
      });

      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTaskId
            ? { ...task, title: newTaskTitle, content: newTaskContent }
            : task
        )
      );
      setEditingTaskId(null);
      setNewTaskTitle('');
      setNewTaskContent('');
    } catch (error) {
      console.error('Error updating task: ', error);
    }
  };

  // Cancel the edit
  const cancelEdit = () => {
    setEditingTaskId(null);
    setNewTaskContent('');
    setNewTaskTitle('');
  };

  // Completes the task
  const handleComplete = async (id) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const taskRef = doc(db, 'users', user.uid, 'tasks', id);
        await updateDoc(taskRef, { completed: true });
        await fetchTasks();
      } catch (error) {
        console.error('Error editing task: ', error);
      }
    }
  };
  // Returns the tasks to incomplete
  const revertComplete = async (id) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const taskRef = doc(db, 'users', user.uid, 'tasks', id);
        await updateDoc(taskRef, { completed: false });
        await fetchTasks();
      } catch (error) {
        console.error('Error editing task: ', error);
      }
    }
  };

  // Filtered tasks for completed
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="flex h-screen">
      <SideBar
        onTabChange={handleTabChange}
        handleLogout={handleLogout}
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
        isDeleteModalOpen={isDeleteModalOpen}
        handleDeleteClick={handleDeleteClick}
        handleDelete={handleDelete}
        cancelDelete={cancelDelete}
        loading={loading}
        saveEdit={handleEditSave}
        cancelEdit={cancelEdit}
        setNewTaskTitle={setNewTaskTitle}
        setNewTaskContent={setNewTaskContent}
        editingTaskId={editingTaskId}
        newTaskTitle={newTaskTitle}
        newTaskContent={newTaskContent}
        handleEditClick={handleEditClick}
        handleComplete={handleComplete}
        revertComplete={revertComplete}
        completedTasks={completedTasks}
        deletingTaskId={deletingTaskId}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
    </div>
  );
};

export default TodoApp;
