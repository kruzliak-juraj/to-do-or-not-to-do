import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"

export const tasksErrorSlice = createAppSlice({
  name: "tasksError",
  initialState: false,
  reducers: create => ({
    setTasksError: create.reducer(
      (state, action: PayloadAction<boolean>) => action.payload,
    ),
  }),
})

export const { setTasksError } = tasksErrorSlice.actions
