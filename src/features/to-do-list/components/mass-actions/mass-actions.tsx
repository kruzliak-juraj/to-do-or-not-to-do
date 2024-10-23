import { Button, Flex } from "@mantine/core"
import {
  useDeleteTaskMutation,
  useGetAllTasksQuery,
  useSetTaskCompletionMutation,
} from "../../tasksApiSlice"
import { useAppDispatch } from "../../../../app/hooks"
import { useEffect } from "react"
import { setTasksError } from "../../tasksErrorSlice"

export const MassActions = () => {
  const { data, isError } = useGetAllTasksQuery()
  const dispatch = useAppDispatch()

  const [setCompletion, { isError: isCompletionError }] =
    useSetTaskCompletionMutation()
  const [deleteTask, { isError: isDeleteError }] = useDeleteTaskMutation()

  useEffect(() => {
    if (isCompletionError || isDeleteError || isError) {
      dispatch(setTasksError(true))
    }
  }, [isDeleteError, isCompletionError, isError, dispatch])

  if (!data) {
    return null
  }

  const incompleteIds = data
    .filter(task => !task.completed)
    .map(task => task.id)
  const completedIds = data.filter(task => task.completed).map(task => task.id)

  return (
    <Flex justify="space-between" mt="xs">
      <Button
        color="green"
        onClick={() => {
          incompleteIds.forEach(id => {
            setCompletion({ id, newState: true })
          })
        }}
      >
        Gather all
      </Button>
      <Button
        color="red"
        onClick={() => {
          completedIds.forEach(id => {
            deleteTask(id)
          })
        }}
      >
        Delete gathered
      </Button>
    </Flex>
  )
}
