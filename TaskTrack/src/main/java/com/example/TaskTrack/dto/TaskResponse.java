package com.example.TaskTrack.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.example.TaskTrack.enums.TaskPriority;
import com.example.TaskTrack.enums.TaskStatus;

import lombok.Data;

@Data
public class TaskResponse {
    private Long id;
    private String title;
    private String description;
    private TaskStatus status;
    private TaskPriority priority;
    private LocalDate dueDate;
    private String assignedTo;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
