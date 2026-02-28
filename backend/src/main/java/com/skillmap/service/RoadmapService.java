package com.skillmap.service;

import com.skillmap.dto.MilestoneDTO;
import com.skillmap.model.Milestone;
import com.skillmap.model.Roadmap;
import com.skillmap.model.User;
import com.skillmap.repository.RoadmapRepository;
import com.skillmap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoadmapService {

    @Autowired
    private RoadmapRepository roadmapRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GeminiService geminiService;

    public List<Roadmap> getAllSeededRoadmaps() {
        return roadmapRepository.findByIsSeededTrue();
    }

    public Roadmap getById(Long id) {
        return roadmapRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Roadmap not found with id: " + id));
    }

    public Roadmap generateWithAI(String goal, String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<MilestoneDTO> milestoneDTOs = geminiService.generateRoadmap(goal);

        Roadmap roadmap = new Roadmap();
        roadmap.setGoal(goal);
        roadmap.setDescription("AI-generated roadmap for: " + goal);
        roadmap.setCreatedBy(user);
        roadmap.setSeeded(false);

        List<Milestone> milestones = milestoneDTOs.stream().map(dto -> {
            Milestone m = new Milestone();
            m.setTitle(dto.getTitle());
            m.setDescription(dto.getDescription());
            m.setResourceUrl(dto.getResourceUrl());
            m.setOrderIndex(dto.getOrderIndex());
            m.setRoadmap(roadmap);
            return m;
        }).collect(Collectors.toList());

        roadmap.setMilestones(milestones);
        return roadmapRepository.save(roadmap);
    }

    public List<Roadmap> getUserRoadmaps(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return roadmapRepository.findByCreatedBy(user);
    }
}
