package com.example.TaskTrack.specifications;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.example.TaskTrack.entities.Task;
import com.example.TaskTrack.entities.User;
import com.example.TaskTrack.enums.TaskPriority;
import com.example.TaskTrack.enums.TaskStatus;
import com.example.TaskTrack.enums.UserRole;

import jakarta.persistence.criteria.Predicate;

public class TaskSpecification {

    private TaskSpecification() {}

    public static Specification<Task> build(User user, TaskStatus status, TaskPriority priority) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (user.getRole() != UserRole.ADMIN) {
                predicates.add(cb.equal(root.get("user"), user));
            }
            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }
            if (priority != null) {
                predicates.add(cb.equal(root.get("priority"), priority));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    public static Specification<Task> buildForAdmin(TaskStatus status, TaskPriority priority) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }
            if (priority != null) {
                predicates.add(cb.equal(root.get("priority"), priority));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
