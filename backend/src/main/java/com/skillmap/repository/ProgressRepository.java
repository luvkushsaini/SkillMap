package com.skillmap.repository;

import com.skillmap.model.UserProgress;
import com.skillmap.model.User;
import com.skillmap.model.Milestone;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ProgressRepository extends JpaRepository<UserProgress, Long> {
    List<UserProgress> findByUserAndMilestone_Roadmap_Id(User user, Long roadmapId);
    Optional<UserProgress> findByUserAndMilestone(User user, Milestone milestone);
    List<UserProgress> findByUser(User user);
}
