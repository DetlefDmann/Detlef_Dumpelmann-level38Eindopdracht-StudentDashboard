import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import studentDataReducer from "../features/studentData/studentDataSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    studentData: studentDataReducer,
  },
});
