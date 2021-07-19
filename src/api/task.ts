import apiRequest from '../utils/request'

export enum TaskStatus {
  Running = 'Running',
  Done = 'Done',
  Err = 'Error',
}
export type TaskOutput = ScanLibraryOutput;
export interface Task {
  id: number;
  status: TaskStatus;
  type: string;
  output: TaskOutput;
}

export interface ScanLibraryOutput {
  total: number;
  current: number;
}

export const fetchTaskList = async ():Promise<{
  success:boolean
  tasks:Array<Task>
}> => {
  return await apiRequest.get('/task')
}
