import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import SideBar from '../containers/SideBar';
import Tasks from '../containers/Tasks';
import {
  fetchTasks,
  setSelectedTab,
  addTask,
  deleteTask,
  updateTask,
  setIsAddModalOpen,
  setIsDeleteModalOpen,
  setNewTask,
  setEditingTaskId,
  setNewTaskTitle,
  setNewTaskContent,
  setDeletingTaskId,
} from '../redux/tasksSlice';
import { AppDispatch, RootState } from '../redux/store';
import { Task } from '../redux/types';

const TodoApp = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const {
    selectedTab,
    tasks,
    loading,
    isAddModalOpen,
    isDeleteModalOpen,
    newTask,
    editingTaskId,
    newTaskTitle,
    newTaskContent,
    deletingTaskId,
  } = useSelector((state: RootState) => state.tasks);

  const completedTasks = tasks.filter((task) => task.completed);

  useEffect(() => {
    dispatch(fetchTasks(selectedTab));
  }, [dispatch, selectedTab]);

  const handleTabChange = (tab: string) => {
    dispatch(setSelectedTab(tab));
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      const taskData = {
        name: user.displayName,
        content: newTask.content,
        title: newTask.title,
        completed: false,
        category: newTask.category,
      };
      dispatch(addTask(taskData));
    }
  };

  const handleDeleteClick = (task: Task) => {
    dispatch(setIsDeleteModalOpen(true));
    dispatch(setDeletingTaskId(task.id));
  };

  const handleDelete = async () => {
    if (deletingTaskId) {
      dispatch(deleteTask(deletingTaskId));
    }
  };

  const handleEditClick = (task: Task) => {
    dispatch(setEditingTaskId(task.id));
    dispatch(setNewTaskTitle(task.title));
    dispatch(setNewTaskContent(task.content));
  };

  const handleEditSave = async () => {
    if (editingTaskId) {
      dispatch(
        updateTask({
          taskId: editingTaskId,
          updates: { title: newTaskTitle, content: newTaskContent },
        })
      );
      dispatch(setEditingTaskId(''));
      dispatch(setNewTaskTitle(''));
      dispatch(setNewTaskContent(''));
    }
  };

  const handleComplete = async (id: string) => {
    dispatch(updateTask({ taskId: id, updates: { completed: true } }));
  };

  const revertComplete = async (id: string) => {
    dispatch(updateTask({ taskId: id, updates: { completed: false } }));
  };

  return (
    <div className="flex h-screen">
      <SideBar
        onTabChange={handleTabChange}
        handleLogout={handleLogout}
        selectedTab={selectedTab}
      />
      <Tasks
        tasks={tasks}
        onSearchChange={() => {}}
        handleSearch={() => {}}
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={(value) => dispatch(setIsAddModalOpen(value))}
        newTask={newTask}
        setNewTask={(value) => dispatch(setNewTask(value))}
        addTask={handleAddTask}
        isDeleteModalOpen={isDeleteModalOpen}
        handleDeleteClick={handleDeleteClick}
        handleDelete={handleDelete}
        cancelDelete={() => {
          dispatch(setDeletingTaskId(''));
          dispatch(setIsDeleteModalOpen(false));
        }}
        loading={loading}
        saveEdit={handleEditSave}
        cancelEdit={() => {
          dispatch(setEditingTaskId(''));
          dispatch(setNewTaskContent(''));
          dispatch(setNewTaskTitle(''));
        }}
        setNewTaskTitle={(value) => dispatch(setNewTaskTitle(value))}
        setNewTaskContent={(value) => dispatch(setNewTaskContent(value))}
        editingTaskId={editingTaskId}
        newTaskTitle={newTaskTitle}
        newTaskContent={newTaskContent}
        handleEditClick={handleEditClick}
        handleComplete={handleComplete}
        revertComplete={revertComplete}
        completedTasks={completedTasks}
        deletingTaskId={deletingTaskId}
        setIsDeleteModalOpen={(value) => dispatch(setIsDeleteModalOpen(value))}
      />
    </div>
  );
};

export default TodoApp;
