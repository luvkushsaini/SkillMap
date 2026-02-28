package com.skillmap.service;

import com.skillmap.model.*;
import com.skillmap.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProgressService {

    @Autowired
    private ProgressRepository progressRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoadmapRepository roadmapRepository;

    public List<UserProgress> getProgressForRoadmap(Long roadmapId, String email) {
        User user = getUser(email);
        return progressRepository.findByUserAndMilestone_Roadmap_Id(user, roadmapId);
    }

    public UserProgress updateProgress(Long milestoneId, boolean completed, String email) {
        User user = getUser(email);
        Optional<UserProgress> existing = progressRepository.findByUser(user)
            .stream()
            .filter(p -> p.getMilestone().getId().equals(milestoneId))
            .findFirst();

        UserProgress progress = existing.orElseGet(() -> {
            UserProgress p = new UserProgress();
            p.setUser(user);
            Milestone m = new Milestone();
            m.setId(milestoneId);
            p.setMilestone(m);
            return p;
        });

        progress.setCompleted(completed);
        progress.setCompletedAt(completed ? LocalDateTime.now() : null);
        return progressRepository.save(progress);
    }

    public List<Map<String, Object>> getProgressSummary(String email) {
        User user = getUser(email);
        List<Roadmap> userRoadmaps = roadmapRepository.findByCreatedBy(user);

        return userRoadmaps.stream().map(roadmap -> {
            int total = roadmap.getMilestones().size();
            long completed = progressRepository
                .findByUserAndMilestone_Roadmap_Id(user, roadmap.getId())
                .stream().filter(UserProgress::isCompleted).count();
            int pct = total == 0 ? 0 : (int) ((completed * 100) / total);

            Map<String, Object> summary = new HashMap<>();
            summary.put("roadmapId", roadmap.getId());
            summary.put("goal", roadmap.getGoal());
            summary.put("totalMilestones", total);
            summary.put("completedMilestones", completed);
            summary.put("completionPercentage", pct);
            return summary;
        }).collect(Collectors.toList());
    }

    private User getUser(String email) {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
