export enum FilterOptions {
  ALL = "all",
  COMPLETED = "completed",
  INCOMPLETE = "incomplete",
}

export type FilterControlsProps = {
  filter: FilterOptions
  setFilter: (filter: FilterOptions) => void
}
