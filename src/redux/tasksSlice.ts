import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db, auth } from '../firebase';
import {
  collection,
  getDocs,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';

import { TodoState, Task } from './types';

const initialState: TodoState = {
  selectedTab: 'all',
  tasks: [],
  loading: true,
  isAddModalOpen: false,
  isDeleteModalOpen: false,
  newTask: {
    content: '',
    title: '',
    completed: false,
    category: 'work',
  },
  editingTaskId: '',
  newTaskTitle: '',
  newTaskContent: '',
  deletingTaskId: '',
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (selectedTab: string) => {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');

    const taskRef = collection(db, 'users', user.uid, 'tasks');
    const data = await getDocs(taskRef);
    const tasks: Task[] = data.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Task, 'id'>),
    }));

    if (selectedTab === 'all') return tasks;
    return tasks.filter((task) => task.category === selectedTab);
  }
);

// Add task
export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (taskData: Omit<Task, 'id'>) => {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');

    const docRef = await addDoc(
      collection(db, 'users', user.uid, 'tasks'),
      taskData
    );
    return { id: docRef.id, ...taskData };
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: string) => {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');

    await deleteDoc(doc(db, 'users', user.uid, 'tasks', taskId));
    return taskId;
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ taskId, updates }: { taskId: string; updates: Partial<Task> }) => {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');

    await updateDoc(doc(db, 'users', user.uid, 'tasks', taskId), updates);
    return { taskId, updates };
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
    setIsAddModalOpen: (state, action) => {
      state.isAddModalOpen = action.payload;
    },
    setIsDeleteModalOpen: (state, action) => {
      state.isDeleteModalOpen = action.payload;
    },
    setNewTask: (state, action) => {
      state.newTask = action.payload;
    },
    setEditingTaskId: (state, action) => {
      state.editingTaskId = action.payload;
    },
    setNewTaskTitle: (state, action) => {
      state.newTaskTitle = action.payload;
    },
    setNewTaskContent: (state, action) => {
      state.newTaskContent = action.payload;
    },
    setDeletingTaskId: (state, action) => {
      state.deletingTaskId = action.payload;
    },
    resetNewTask: (state) => {
      state.newTask = initialState.newTask;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.isAddModalOpen = false;
        state.newTask = initialState.newTask;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        state.isDeleteModalOpen = false;
        state.deletingTaskId = '';
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const { taskId, updates } = action.payload;
        state.tasks = state.tasks.map((task) =>
          task.id === taskId ? { ...task, ...updates } : task
        );
      });
  },
});

export const {
  setSelectedTab,
  setIsAddModalOpen,
  setIsDeleteModalOpen,
  setNewTask,
  setEditingTaskId,
  setNewTaskTitle,
  setNewTaskContent,
  setDeletingTaskId,
  resetNewTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
