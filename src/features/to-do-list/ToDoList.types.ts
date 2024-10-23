export type Task = {
  id: string
  text: string
  completed: boolean
  createdDate: number
  completedDate: number
}

export type UpdateTask = {
  id: string
  text: string
}
