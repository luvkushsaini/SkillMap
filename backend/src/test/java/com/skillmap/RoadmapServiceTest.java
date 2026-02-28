package com.skillmap;

import com.skillmap.model.Roadmap;
import com.skillmap.repository.RoadmapRepository;
import com.skillmap.repository.UserRepository;
import com.skillmap.service.GeminiService;
import com.skillmap.service.RoadmapService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RoadmapServiceTest {

    @Mock
    private RoadmapRepository roadmapRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private GeminiService geminiService;

    @InjectMocks
    private RoadmapService roadmapService;

    @Test
    void shouldReturnAllSeededRoadmaps() {
        List<Roadmap> mockRoadmaps = List.of(
            new Roadmap(1L, "Backend Developer", "Learn backend", null, List.of(), true, null),
            new Roadmap(2L, "Frontend Developer", "Learn frontend", null, List.of(), true, null)
        );
        when(roadmapRepository.findByIsSeededTrue()).thenReturn(mockRoadmaps);

        List<Roadmap> result = roadmapService.getAllSeededRoadmaps();

        assertEquals(2, result.size());
        verify(roadmapRepository, times(1)).findByIsSeededTrue();
    }

    @Test
    void shouldThrowExceptionWhenRoadmapNotFound() {
        when(roadmapRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> roadmapService.getById(999L));
    }

    @Test
    void shouldReturnRoadmapById() {
        Roadmap mock = new Roadmap(1L, "Backend Developer", "Learn backend", null, List.of(), true, null);
        when(roadmapRepository.findById(1L)).thenReturn(Optional.of(mock));

        Roadmap result = roadmapService.getById(1L);

        assertEquals("Backend Developer", result.getGoal());
    }
}
