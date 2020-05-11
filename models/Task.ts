export type Task = {
  taskId: string,
  resourceId: string,
  status: string,
  errorMessage: string,
  createdAt: number,
  updatedAt?: number
}
