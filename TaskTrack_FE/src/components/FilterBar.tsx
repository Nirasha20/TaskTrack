'use client';
import { TaskFilters, TaskSortOptions, TaskStatus, TaskPriority } from '@/types';

interface Props {
  filters: TaskFilters;
  sort: TaskSortOptions;
  onFilterChange: (f: TaskFilters) => void;
  onSortChange: (s: TaskSortOptions) => void;
  onNewTask?: () => void;
}

const statusOptions: { value: TaskStatus | ''; label: string }[] = [
  { value: '', label: 'All Statuses' },
  { value: 'TODO', label: 'To Do' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'DONE', label: 'Done' },
];

const priorityOptions: { value: TaskPriority | ''; label: string }[] = [
  { value: '', label: 'All Priorities' },
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
];

const sortByOptions = [
  { value: 'createdAt', label: 'Created Date' },
  { value: 'dueDate', label: 'Due Date' },
  { value: 'priority', label: 'Priority' },
];

export default function FilterBar({ filters, sort, onFilterChange, onSortChange, onNewTask }: Props) {
  const hasActiveFilters = !!filters.status || !!filters.priority;

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Status filter */}
      <select
        value={filters.status ?? ''}
        onChange={(e) => onFilterChange({ ...filters, status: e.target.value as TaskStatus | '' })}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {statusOptions.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      {/* Priority filter */}
      <select
        value={filters.priority ?? ''}
        onChange={(e) => onFilterChange({ ...filters, priority: e.target.value as TaskPriority | '' })}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {priorityOptions.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      {/* Sort by */}
      <select
        value={sort.sortBy}
        onChange={(e) => onSortChange({ ...sort, sortBy: e.target.value as TaskSortOptions['sortBy'] })}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {sortByOptions.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      {/* Sort direction */}
      <button
        onClick={() => onSortChange({ ...sort, sortDir: sort.sortDir === 'asc' ? 'desc' : 'asc' })}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white hover:bg-gray-50 transition-colors"
        title={sort.sortDir === 'asc' ? 'Ascending' : 'Descending'}
      >
        {sort.sortDir === 'asc' ? '↑ Asc' : '↓ Desc'}
      </button>

      {/* Clear filters */}
      {hasActiveFilters && (
        <button
          onClick={() => onFilterChange({ status: '', priority: '' })}
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Clear filters
        </button>
      )}

      {/* New task — pushed right, only shown for USER role */}
      {onNewTask && (
        <div className="ml-auto">
          <button
            onClick={onNewTask}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            + New Task
          </button>
        </div>
      )}
    </div>
  );
}
