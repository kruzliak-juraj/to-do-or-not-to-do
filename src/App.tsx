import "@mantine/core/styles.css"
import { ToDoList } from "./features/to-do-list/ToDoList"
import { Container, Text, Title } from "@mantine/core"

const App = () => {
  return (
    <Container size="xs" mt="md">
      <Title>Gather to save Middle-Earth</Title>
      <Text c="dimmed">You can also double-click the text to edit it.</Text>

      <ToDoList />
    </Container>
  )
}

export default App
