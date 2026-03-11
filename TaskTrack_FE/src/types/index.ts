export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';
export type UserRole = 'USER' | 'ADMIN';

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFormData {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
}

export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface AuthUser {
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  role: UserRole;
}

export interface TaskFilters {
  status?: TaskStatus | '';
  priority?: TaskPriority | '';
}

export interface TaskSortOptions {
  sortBy: 'dueDate' | 'priority' | 'createdAt';
  sortDir: 'asc' | 'desc';
}

export interface FetchTasksParams extends TaskFilters, TaskSortOptions {
  page: number;
  size: number;
}

