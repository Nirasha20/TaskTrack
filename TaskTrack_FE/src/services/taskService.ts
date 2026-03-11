import apiClient from "@/lib/axios";
import { Task, TaskFormData, PagedResponse, FetchTasksParams } from "@/types";

export const taskService = {
  getAll: (params: FetchTasksParams) => {
    const queryParams: Record<string, string | number> = {
      page: params.page,
      size: params.size,
      sortBy: params.sortBy,
      sortDir: params.sortDir,
    };
    if (params.status) queryParams.status = params.status;
    if (params.priority) queryParams.priority = params.priority;
    return apiClient.get<PagedResponse<Task>>("/tasks", { params: queryParams });
  },

  getAllAdmin: (params: FetchTasksParams) => {
    const queryParams: Record<string, string | number> = {
      page: params.page,
      size: params.size,
      sortBy: params.sortBy,
      sortDir: params.sortDir,
    };
    if (params.status) queryParams.status = params.status;
    if (params.priority) queryParams.priority = params.priority;
    return apiClient.get<PagedResponse<Task>>("/tasks/all", { params: queryParams });
  },

  getById: (id: number) => apiClient.get<Task>(`/tasks/${id}`),

  create: (data: TaskFormData) => apiClient.post<Task>("/tasks", data),

  update: (id: number, data: TaskFormData) => apiClient.put<Task>(`/tasks/${id}`, data),

  markCompleted: (id: number) => apiClient.patch<Task>(`/tasks/${id}/complete`),

  delete: (id: number) => apiClient.delete<void>(`/tasks/${id}`),
};

