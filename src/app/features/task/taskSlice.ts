import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "incomplete" | "completed";
}

const initialState: Task[] = [];

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Omit<Task, "id">>) {
      const id = nanoid();
      state.push({ ...action.payload, id });
    },
    updateTask(
      state,
      action: PayloadAction<{
        id: string;
        status: "todo" | "incomplete" | "completed";
      }>
    ) {
      const foundIndex = state.findIndex(
        (task) => task.id === action.payload.id
      );
      if (foundIndex !== -1) {
        state[foundIndex].status = action.payload.status;
      }
    },
    deleteTask(state, action: PayloadAction<{ id: string }>) {
      const foundIndex = state.findIndex(
        (task) => task.id === action.payload.id
      );
      if (foundIndex !== -1) {
        state.splice(foundIndex, 1);
      }
    },
  },
});

export const { addTask, updateTask, deleteTask } = taskSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export default taskSlice.reducer;
