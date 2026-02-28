package com.skillmap.controller;

import com.skillmap.model.UserProgress;
import com.skillmap.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin(origins = "http://localhost:3000")
@PreAuthorize("isAuthenticated()")
public class ProgressController {

    @Autowired
    private ProgressService progressService;

    @GetMapping("/{roadmapId}")
    public ResponseEntity<List<UserProgress>> getProgress(
            @PathVariable Long roadmapId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
            progressService.getProgressForRoadmap(roadmapId, userDetails.getUsername())
        );
    }

    @PutMapping("/update")
    public ResponseEntity<UserProgress> updateProgress(
            @RequestBody Map<String, Object> body,
            @AuthenticationPrincipal UserDetails userDetails) {
        Long milestoneId = Long.valueOf(body.get("milestoneId").toString());
        boolean completed = (boolean) body.get("completed");
        return ResponseEntity.ok(
            progressService.updateProgress(milestoneId, completed, userDetails.getUsername())
        );
    }

    @GetMapping("/summary")
    public ResponseEntity<List<Map<String, Object>>> getSummary(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
            progressService.getProgressSummary(userDetails.getUsername())
        );
    }
}
