import type { ItemProps } from "./Item.types"
import {
  ActionIcon,
  Box,
  Checkbox,
  Flex,
  Skeleton,
  TextInput,
} from "@mantine/core"
import { IconCheck, IconEdit, IconX } from "@tabler/icons-react"
import styles from "./Item.module.scss"
import { useEffect, useRef, useState } from "react"
import {
  useDeleteTaskMutation,
  useEditTaskMutation,
  useSetTaskCompletionMutation,
} from "../../tasksApiSlice"
import { setTasksError } from "../../tasksErrorSlice"
import { useAppDispatch } from "../../../../app/hooks"

export const Item = ({ text, id, completed }: ItemProps) => {
  const dispatch = useAppDispatch()
  const editInputRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)

  const [deleteTask, { isError: isDeleteError }] = useDeleteTaskMutation()
  const [setCompletion, { isError: isCompletionError }] =
    useSetTaskCompletionMutation()
  const [editTask, { isError: isEditError, isSuccess, isLoading }] =
    useEditTaskMutation()

  useEffect(() => {
    if (isCompletionError || isDeleteError || isEditError) {
      dispatch(setTasksError(true))
    }
  }, [isDeleteError, isCompletionError, isEditError, dispatch])

  useEffect(() => {
    if (isSuccess && !isLoading) {
      setIsEditing(false)
    }
  }, [isSuccess, isLoading])

  return (
    <li className={styles.item}>
      <Flex align="center">
        <Checkbox
          m="md"
          aria-label={completed ? "Mark as not done" : "Mark as done"}
          checked={completed}
          onChange={event => {
            setCompletion({ id, newState: event.target.checked })
          }}
        />

        {!isEditing && (
          <Box
            component="span"
            my="sm"
            mr="md"
            onClick={event => {
              if (event.detail === 2) {
                setIsEditing(true)
              }
            }}
          >
            {text}
          </Box>
        )}

        {isEditing && (
          <TextInput
            id={id}
            defaultValue={text}
            ref={editInputRef}
            onKeyUp={event => {
              if (event.key === "Enter") {
                editTask({ id, text: editInputRef.current?.value || "" })
              }
            }}
          />
        )}
      </Flex>

      <div className={styles.item__controls}>
        {!isEditing && (
          <ActionIcon
            variant="filled"
            color="cyan"
            aria-label="Edit task"
            onClick={() => {
              setIsEditing(true)
            }}
          >
            <IconEdit />
          </ActionIcon>
        )}

        {isEditing && (
          <ActionIcon
            variant="filled"
            color="green"
            aria-label="Save task name change"
            onClick={() => {
              editTask({ id, text: editInputRef.current?.value || "" })
            }}
          >
            <IconCheck />
          </ActionIcon>
        )}

        <ActionIcon
          variant="filled"
          color="red"
          mr="md"
          aria-label="Delete task"
          onClick={() => {
            deleteTask(id)
          }}
        >
          <IconX />
        </ActionIcon>
      </div>
    </li>
  )
}

export const ItemSkeleton = () => {
  return (
    <div className={styles.item}>
      <Flex align="center">
        <Skeleton m="md" height={20} width={20} />

        <Skeleton height={20} width={100} />
      </Flex>

      <div className={styles.item__controls}>
        <Skeleton height={28} width={28} />

        <Skeleton mr="md" height={28} width={28} />
      </div>
    </div>
  )
}
