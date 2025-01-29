import { configureStore } from '@reduxjs/toolkit';
import tasksReducers from './tasksSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
