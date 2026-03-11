import { useCallback } from "react";
import { useTaskStore } from "@/store/taskStore";
import { taskService } from "@/services/taskService";
import { FetchTasksParams, TaskFormData } from "@/types";

export function useTasks() {
  const {
    tasks, totalElements, totalPages, isLoading, error,
    setTasksPage, addTask, replaceTask, removeTask, setLoading, setError,
  } = useTaskStore();

  const fetchTasks = useCallback(async (params: FetchTasksParams) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await taskService.getAll(params);
      setTasksPage(data);
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      setError(axiosError.response?.data?.message ?? "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  }, [setTasksPage, setLoading, setError]);

  const fetchAllTasks = useCallback(async (params: FetchTasksParams) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await taskService.getAllAdmin(params);
      setTasksPage(data);
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      setError(axiosError.response?.data?.message ?? "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  }, [setTasksPage, setLoading, setError]);

  const createTask = useCallback(async (taskData: TaskFormData) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await taskService.create(taskData);
      addTask(data);
      return data;
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      setError(axiosError.response?.data?.message ?? "Failed to create task");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [addTask, setLoading, setError]);

  const updateTask = useCallback(async (id: number, taskData: TaskFormData) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await taskService.update(id, taskData);
      replaceTask(id, data);
      return data;
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      setError(axiosError.response?.data?.message ?? "Failed to update task");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [replaceTask, setLoading, setError]);

  const markCompleted = useCallback(async (id: number) => {
    try {
      const { data } = await taskService.markCompleted(id);
      replaceTask(id, data);
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      setError(axiosError.response?.data?.message ?? "Failed to mark task as completed");
    }
  }, [replaceTask, setError]);

  const deleteTask = useCallback(async (id: number) => {
    try {
      await taskService.delete(id);
      removeTask(id);
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      setError(axiosError.response?.data?.message ?? "Failed to delete task");
      throw err;
    }
  }, [removeTask, setError]);

  return { tasks, totalElements, totalPages, isLoading, error, fetchTasks, fetchAllTasks, createTask, updateTask, markCompleted, deleteTask };
}

