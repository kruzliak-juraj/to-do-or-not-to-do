import { Item, ItemSkeleton } from "./components/item/Item"
import { useGetAllTasksQuery } from "./tasksApiSlice"
import { Alert } from "@mantine/core"
import { IconInfoCircle } from "@tabler/icons-react"
import { useAppSelector } from "../../app/hooks"
import { useState } from "react"
import { AdvancedControls } from "./components/advanced-controls/advanced-controls"
import type { FilterOptions } from "./components/advanced-controls/advanced-controls.types"
import { FilterOptions as FilterOptionsValues } from "./components/advanced-controls/advanced-controls.types"
import { CreateInput } from "./components/create-input/create-input"

export const ToDoList = () => {
  const tasksHaveError = useAppSelector(state => state.tasksError)

  const [filterType, setFilterType] = useState<FilterOptions>(
    FilterOptionsValues.ALL,
  )

  const { data, isLoading, isSuccess, isFetching, isError } =
    useGetAllTasksQuery()

  if (isError || tasksHaveError) {
    return (
      <Alert
        mt="md"
        variant="outline"
        color="red"
        title="Mountains of Mordor tremble"
        icon={<IconInfoCircle />}
      >
        The Eye of Sauron is upon us! Please hide and then try again later.
      </Alert>
    )
  }

  if (isLoading || isFetching) {
    return (
      <>
        {Array.from({ length: 3 }).map((item, index) => (
          <ItemSkeleton key={index} />
        ))}
      </>
    )
  }

  if (isSuccess) {
    return (
      <>
        <CreateInput />

        <AdvancedControls filter={filterType} setFilter={setFilterType} />

        <p>
          Progress:{" "}
          {`${data.filter(task => task.completed).length}/${data.length}`}
        </p>
        {data.length ? (
          <ul>
            {data.map(task => {
              if (filterType === "completed" && task.completed) {
                return <Item {...task} key={task.id} />
              }

              if (filterType === "incomplete" && !task.completed) {
                return <Item {...task} key={task.id} />
              }

              if (filterType === "all") {
                return <Item {...task} key={task.id} />
              }

              return null
            })}
          </ul>
        ) : (
          <p>No items needed to gather, did we save Middle-Earth?</p>
        )}
      </>
    )
  }

  return null
}
