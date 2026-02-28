package com.skillmap.repository;

import com.skillmap.model.Roadmap;
import com.skillmap.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RoadmapRepository extends JpaRepository<Roadmap, Long> {
    List<Roadmap> findByIsSeededTrue();
    List<Roadmap> findByCreatedBy(User user);
}
