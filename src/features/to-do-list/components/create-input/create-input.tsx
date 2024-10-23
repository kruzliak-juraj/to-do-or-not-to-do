import { Button, Flex, TextInput } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import { useEffect, useRef } from "react"
import { useCreateNewTaskMutation } from "../../tasksApiSlice"
import { setTasksError } from "../../tasksErrorSlice"
import { useAppDispatch } from "../../../../app/hooks"

export const CreateInput = () => {
  const dispatch = useAppDispatch()
  const newInputRef = useRef<HTMLInputElement>(null)
  const [createTask, { isError }] = useCreateNewTaskMutation()

  useEffect(() => {
    if (isError) {
      dispatch(setTasksError(true))
    }
  }, [isError, dispatch])

  return (
    <Flex direction={{ base: "column", xs: "row" }} gap="md" my="md">
      <TextInput
        flex={1}
        placeholder="Resources to gather"
        ref={newInputRef}
        onKeyUp={event => {
          if (event.key === "Enter") {
            createTask(newInputRef.current?.value || "")
          }
        }}
      />
      <Button
        onClick={() => createTask(newInputRef.current?.value || "")}
        rightSection={<IconPlus />}
      >
        Add item
      </Button>
    </Flex>
  )
}
