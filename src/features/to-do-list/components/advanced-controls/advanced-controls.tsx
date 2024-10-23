import type { SwitchProps } from "@mantine/core"
import { Divider } from "@mantine/core"
import { Accordion, Group, Switch } from "@mantine/core"
import type { FilterControlsProps } from "./advanced-controls.types"
import { FilterOptions } from "./advanced-controls.types"
import type { ChangeEvent } from "react"
import { MassActions } from "../mass-actions/mass-actions"

export const AdvancedControls = ({
  filter,
  setFilter,
}: FilterControlsProps) => {
  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.name as FilterOptions)
  }

  return (
    <Accordion defaultValue="Advanced controls">
      <Accordion.Item value="Advanced controls">
        <Accordion.Control>Advanced controls</Accordion.Control>

        <Accordion.Panel>
          <MassActions />

          <Divider my="md" />

          <Group mt="xs">
            <ControlSwitch
              checked={filter === FilterOptions.COMPLETED}
              name={FilterOptions.COMPLETED}
              label="Show completed"
              onChange={handleFilterChange}
            />
            <ControlSwitch
              checked={filter === FilterOptions.INCOMPLETE}
              name={FilterOptions.INCOMPLETE}
              label="Show incomplete"
              onChange={handleFilterChange}
            />
            <ControlSwitch
              checked={filter === FilterOptions.ALL}
              name={FilterOptions.ALL}
              label="Show all"
              onChange={handleFilterChange}
            />
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}

const ControlSwitch = (props: SwitchProps) => (
  <Switch w={{ base: "100%", xs: "initial" }} {...props} />
)
