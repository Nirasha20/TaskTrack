'use client';
import { Task } from '@/types';

const STATUS_STYLES: Record<string, string> = {
  TODO: 'bg-gray-100 text-gray-600',
  IN_PROGRESS: 'bg-blue-100 text-blue-700',
  DONE: 'bg-green-100 text-green-700',
};

const PRIORITY_STYLES: Record<string, string> = {
  LOW: 'bg-emerald-100 text-emerald-700',
  MEDIUM: 'bg-yellow-100 text-yellow-700',
  HIGH: 'bg-red-100 text-red-700',
};

const STATUS_LABELS: Record<string, string> = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
};

interface Props {
  task: Task;
  showAssignee?: boolean;
  readOnly?: boolean;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onMarkComplete: (id: number) => void;
}

export default function TaskCard({ task, showAssignee, readOnly, onEdit, onDelete, onMarkComplete }: Props) {
  const isOverdue =
    task.dueDate && task.status !== 'DONE' && new Date(task.dueDate) < new Date();

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3 hover:shadow-sm transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-gray-900 leading-snug line-clamp-2">{task.title}</h3>
        <div className="flex gap-1.5 shrink-0">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[task.status]}`}>
            {STATUS_LABELS[task.status]}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_STYLES[task.priority]}`}>
            {task.priority}
          </span>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-gray-500 line-clamp-2">{task.description}</p>
      )}

      {/* Meta */}
      <div className="flex flex-wrap gap-3 text-xs text-gray-400">
        {task.dueDate && (
          <span className={isOverdue ? 'text-red-500 font-medium' : ''}>
            Due {new Date(task.dueDate).toLocaleDateString()}
            {isOverdue && ' (overdue)'}
          </span>
        )}
        {showAssignee && (
          <span>Assigned to: <span className="text-gray-600">{task.assignedTo}</span></span>
        )}
        <span>Created {new Date(task.createdAt).toLocaleDateString()}</span>
      </div>

      {/* Actions — hidden in read-only (admin) mode */}
      {!readOnly && (
        <div className="flex gap-2 pt-1 border-t border-gray-100">
          {task.status !== 'DONE' && (
            <button
              onClick={() => onMarkComplete(task.id)}
              className="text-xs text-green-600 hover:text-green-700 font-medium transition-colors"
            >
              ✓ Mark Done
            </button>
          )}
          <button
            onClick={() => onEdit(task)}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors ml-auto"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-xs text-red-500 hover:text-red-600 font-medium transition-colors"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
