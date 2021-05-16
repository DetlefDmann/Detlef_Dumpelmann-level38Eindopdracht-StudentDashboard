import { configureStore } from '@reduxjs/toolkit';
import studentDataReducer from "../features/studentData/studentDataSlice";

export const store = configureStore({
  reducer: {
    studentData: studentDataReducer,
  },
});
