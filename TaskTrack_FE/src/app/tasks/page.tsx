'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useTasks } from '@/hooks/useTasks';
import { Task, TaskFilters, TaskSortOptions, TaskFormData } from '@/types';
import Navbar from '@/components/Navbar';
import FilterBar from '@/components/FilterBar';
import TaskCard from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';
import Pagination from '@/components/Pagination';

const PAGE_SIZE = 9;

export default function TasksPage() {
  const router = useRouter();
  const { isAuthenticated, isInitialized, user } = useAuthStore();

  const isAdmin = user?.role === 'ADMIN';

  const { tasks, totalElements, totalPages, isLoading, error, fetchTasks, fetchAllTasks, createTask, updateTask, deleteTask, markCompleted } =
    useTasks();

  const [filters, setFilters] = useState<TaskFilters>({ status: '', priority: '' });
  const [sort, setSort] = useState<TaskSortOptions>({ sortBy: 'createdAt', sortDir: 'desc' });
  const [page, setPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Auth guard
  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isInitialized, isAuthenticated, router]);

  const loadTasks = useCallback(() => {
    if (!isAuthenticated) return;
    const params = {
      status: filters.status || undefined,
      priority: filters.priority || undefined,
      sortBy: sort.sortBy,
      sortDir: sort.sortDir,
      page,
      size: PAGE_SIZE,
    };
    if (isAdmin) {
      fetchAllTasks(params);
    } else {
      fetchTasks(params);
    }
  }, [fetchTasks, fetchAllTasks, isAdmin, filters, sort, page, isAuthenticated]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Reset to page 0 when filters/sort change
  useEffect(() => {
    setPage(0);
  }, [filters, sort]);

  const handleFilterChange = (newFilters: TaskFilters) => setFilters(newFilters);
  const handleSortChange = (newSort: TaskSortOptions) => setSort(newSort);

  const openCreate = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleSubmit = async (data: TaskFormData) => {
    if (editingTask) {
      await updateTask(editingTask.id, data);
    } else {
      await createTask(data);
    }
    closeModal();
    loadTasks();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this task?')) return;
    await deleteTask(id);
    loadTasks();
  };

  const handleMarkComplete = async (id: number) => {
    await markCompleted(id);
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-400 text-sm">Loading…</div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {user?.role === 'ADMIN' ? 'All Tasks' : 'My Tasks'}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {totalElements} task{totalElements !== 1 ? 's' : ''} total
          </p>
        </div>

        {/* Filters + New Task button (New Task hidden for admin) */}
        <div className="mb-6">
          <FilterBar
            filters={filters}
            sort={sort}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            onNewTask={isAdmin ? undefined : openCreate}
          />
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Loading */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-400 text-sm">Loading tasks…</div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-4xl mb-3">📋</div>
            <h3 className="text-gray-600 font-medium">No tasks found</h3>
            <p className="text-sm text-gray-400 mt-1">
              {filters.status || filters.priority
                ? 'Try clearing your filters.'
                : 'Create your first task to get started.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                showAssignee={isAdmin}
                readOnly={isAdmin}
                onEdit={openEdit}
                onDelete={handleDelete}
                onMarkComplete={handleMarkComplete}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalElements={totalElements}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </main>

      {/* Task form modal — only available for USER role */}
      {!isAdmin && isModalOpen && (
        <TaskForm
          task={editingTask}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      )}
    </div>
  );
}
