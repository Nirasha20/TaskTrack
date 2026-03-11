package com.example.TaskTrack.services;

import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.TaskTrack.dto.PagedResponse;
import com.example.TaskTrack.dto.TaskRequest;
import com.example.TaskTrack.dto.TaskResponse;
import com.example.TaskTrack.entities.Task;
import com.example.TaskTrack.entities.User;
import com.example.TaskTrack.enums.TaskPriority;
import com.example.TaskTrack.enums.TaskStatus;
import com.example.TaskTrack.enums.UserRole;
import com.example.TaskTrack.exception.ForbiddenException;
import com.example.TaskTrack.exception.ResourceNotFoundException;
import com.example.TaskTrack.repositories.TaskRepository;
import com.example.TaskTrack.specifications.TaskSpecification;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class TaskService {

    private final TaskRepository taskRepository;

    private static final Set<String> ALLOWED_SORT_FIELDS =
            Set.of("dueDate", "priority", "createdAt", "updatedAt");

    public TaskResponse createTask(TaskRequest request, User currentUser) {
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setPriority(request.getPriority());
        task.setDueDate(request.getDueDate());
        task.setUser(currentUser);
        return toResponse(taskRepository.save(task));
    }

    @Transactional(readOnly = true)
    public PagedResponse<TaskResponse> getTasks(User currentUser, TaskStatus status,
                                                TaskPriority priority, int page, int size,
                                                String sortBy, String sortDir) {
        String field = ALLOWED_SORT_FIELDS.contains(sortBy) ? sortBy : "createdAt";
        Sort sort = "asc".equalsIgnoreCase(sortDir)
                ? Sort.by(field).ascending()
                : Sort.by(field).descending();
        Pageable pageable = PageRequest.of(page, Math.min(size, 50), sort);

        Page<Task> taskPage = taskRepository.findAll(
                TaskSpecification.build(currentUser, status, priority), pageable);

        return new PagedResponse<>(
                taskPage.getContent().stream().map(this::toResponse).toList(),
                taskPage.getNumber(),
                taskPage.getSize(),
                taskPage.getTotalElements(),
                taskPage.getTotalPages(),
                taskPage.isLast()
        );
    }

    @Transactional(readOnly = true)
    public PagedResponse<TaskResponse> getAllTasks(TaskStatus status, TaskPriority priority,
                                                   int page, int size, String sortBy, String sortDir) {
        String field = ALLOWED_SORT_FIELDS.contains(sortBy) ? sortBy : "createdAt";
        Sort sort = "asc".equalsIgnoreCase(sortDir)
                ? Sort.by(field).ascending()
                : Sort.by(field).descending();
        Pageable pageable = PageRequest.of(page, Math.min(size, 50), sort);

        Page<Task> taskPage = taskRepository.findAll(
                TaskSpecification.buildForAdmin(status, priority), pageable);

        return new PagedResponse<>(
                taskPage.getContent().stream().map(this::toResponse).toList(),
                taskPage.getNumber(),
                taskPage.getSize(),
                taskPage.getTotalElements(),
                taskPage.getTotalPages(),
                taskPage.isLast()
        );
    }

    @Transactional(readOnly = true)
    public TaskResponse getTaskById(Long id, User currentUser) {
        return toResponse(findAndAuthorize(id, currentUser));
    }

    public TaskResponse updateTask(Long id, TaskRequest request, User currentUser) {
        Task task = findAndAuthorize(id, currentUser);
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setPriority(request.getPriority());
        task.setDueDate(request.getDueDate());
        return toResponse(taskRepository.save(task));
    }

    public TaskResponse markCompleted(Long id, User currentUser) {
        Task task = findAndAuthorize(id, currentUser);
        task.setStatus(TaskStatus.DONE);
        return toResponse(taskRepository.save(task));
    }

    public void deleteTask(Long id, User currentUser) {
        taskRepository.delete(findAndAuthorize(id, currentUser));
    }

    private Task findAndAuthorize(Long id, User currentUser) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
        if (currentUser.getRole() != UserRole.ADMIN
                && !task.getUser().getId().equals(currentUser.getId())) {
            throw new ForbiddenException("You do not have permission to access this task");
        }
        return task;
    }

    private TaskResponse toResponse(Task task) {
        TaskResponse response = new TaskResponse();
        response.setId(task.getId());
        response.setTitle(task.getTitle());
        response.setDescription(task.getDescription());
        response.setStatus(task.getStatus());
        response.setPriority(task.getPriority());
        response.setDueDate(task.getDueDate());
        response.setAssignedTo(task.getUser().getEmail());
        response.setCreatedAt(task.getCreatedAt());
        response.setUpdatedAt(task.getUpdatedAt());
        return response;
    }
}
