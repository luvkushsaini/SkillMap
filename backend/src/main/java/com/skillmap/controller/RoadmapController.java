package com.skillmap.controller;

import com.skillmap.dto.RoadmapRequest;
import com.skillmap.model.Roadmap;
import com.skillmap.service.RoadmapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/roadmaps")
@CrossOrigin(origins = "http://localhost:3000")
public class RoadmapController {

    @Autowired
    private RoadmapService roadmapService;

    @GetMapping
    public ResponseEntity<List<Roadmap>> getAllSeeded() {
        return ResponseEntity.ok(roadmapService.getAllSeededRoadmaps());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Roadmap> getById(@PathVariable Long id) {
        return ResponseEntity.ok(roadmapService.getById(id));
    }

    @PostMapping("/generate")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Roadmap> generate(
            @RequestBody RoadmapRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
            roadmapService.generateWithAI(request.getGoal(), userDetails.getUsername())
        );
    }

    @GetMapping("/my")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Roadmap>> getMyRoadmaps(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
            roadmapService.getUserRoadmaps(userDetails.getUsername())
        );
    }
}
