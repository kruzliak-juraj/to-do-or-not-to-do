import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Task, UpdateTask } from "./ToDoList.types"

export const tasksApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  reducerPath: "tasksApi",
  endpoints: build => ({
    getAllTasks: build.query<Task[], void>({
      query: () => "tasks",
    }),

    createNewTask: build.mutation<Task, string>({
      query: text => ({
        url: "tasks",
        method: "POST",
        body: { text },
      }),

      async onQueryStarted(text, lifecycleApi) {
        const getPostsPatchResult = lifecycleApi.dispatch(
          tasksApiSlice.util.updateQueryData(
            "getAllTasks",
            undefined,
            draft => {
              draft.push({
                text,
                id: "temp-id",
                completed: false,
                createdDate: Date.now(),
                completedDate: 0,
              })
            },
          ),
        )

        try {
          const { data: newTask } = await lifecycleApi.queryFulfilled

          lifecycleApi.dispatch(
            tasksApiSlice.util.updateQueryData(
              "getAllTasks",
              undefined,
              draft => {
                const task = draft.find(task => task.id === "temp-id")
                if (task) {
                  task.id = newTask.id
                }
              },
            ),
          )
        } catch {
          getPostsPatchResult.undo()
        }
      },
    }),

    editTask: build.mutation<Task, UpdateTask>({
      query: post => ({
        url: `tasks/${post.id}`,
        method: "POST",
        body: { text: post.text },
      }),

      async onQueryStarted({ id, text }, lifecycleApi) {
        const getPostsPatchResult = lifecycleApi.dispatch(
          tasksApiSlice.util.updateQueryData(
            "getAllTasks",
            undefined,
            draft => {
              const taskToEdit = draft.find(task => task.id === id)
              if (taskToEdit) {
                taskToEdit.text = text
              }
            },
          ),
        )

        try {
          await lifecycleApi.queryFulfilled
        } catch {
          getPostsPatchResult.undo()
        }
      },
    }),

    deleteTask: build.mutation<Task, string>({
      query: id => ({
        url: `tasks/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(id, lifecycleApi) {
        const getPostsPatchResult = lifecycleApi.dispatch(
          tasksApiSlice.util.updateQueryData(
            "getAllTasks",
            undefined,
            draft => {
              return draft.filter(task => task.id !== id)
            },
          ),
        )

        try {
          await lifecycleApi.queryFulfilled
        } catch {
          getPostsPatchResult.undo()
        }
      },
    }),

    setTaskCompletion: build.mutation<Task, { id: string; newState: boolean }>({
      query: data => ({
        url: `tasks/${data.id}/${data.newState ? "complete" : "incomplete"}`,
        method: "POST",
      }),

      async onQueryStarted({ id, newState }, lifecycleApi) {
        const getPostsPatchResult = lifecycleApi.dispatch(
          tasksApiSlice.util.updateQueryData(
            "getAllTasks",
            undefined,
            draft => {
              const taskToEdit = draft.find(task => task.id === id)
              if (taskToEdit) {
                taskToEdit.completed = newState
              }
            },
          ),
        )

        try {
          await lifecycleApi.queryFulfilled
        } catch {
          getPostsPatchResult.undo()
        }
      },
    }),
  }),
})

export const {
  useCreateNewTaskMutation,
  useDeleteTaskMutation,
  useEditTaskMutation,
  useGetAllTasksQuery,
  useSetTaskCompletionMutation,
} = tasksApiSlice
