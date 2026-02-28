package com.skillmap.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillmap.dto.MilestoneDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<MilestoneDTO> generateRoadmap(String goal) {
        String prompt = "Generate a structured learning roadmap for: " + goal +
            ". Return ONLY a JSON array of objects with fields: " +
            "title (string), description (string), resourceUrl (string), orderIndex (int). " +
            "Include 6-8 milestones. No extra text, just the JSON array.";

        Map<String, Object> requestBody = Map.of(
            "contents", List.of(Map.of(
                "parts", List.of(Map.of("text", prompt))
            ))
        );

        String url = apiUrl + "?key=" + apiKey;
        ResponseEntity<Map> response = restTemplate.postForEntity(url, requestBody, Map.class);
        String rawText = extractTextFromResponse(response.getBody());
        return parseJsonToMilestones(rawText);
    }

    @SuppressWarnings("unchecked")
    private String extractTextFromResponse(Map body) {
        List candidates = (List) body.get("candidates");
        Map first = (Map) candidates.get(0);
        Map content = (Map) first.get("content");
        List parts = (List) content.get("parts");
        Map part = (Map) parts.get(0);
        return (String) part.get("text");
    }

    private List<MilestoneDTO> parseJsonToMilestones(String rawText) {
        try {
            String cleaned = rawText.trim();
            if (cleaned.startsWith("```")) {
                cleaned = cleaned.replaceAll("```json\\n?", "").replaceAll("```\\n?", "").trim();
            }
            return objectMapper.readValue(cleaned, new TypeReference<List<MilestoneDTO>>() {});
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse Gemini response: " + e.getMessage());
        }
    }
}
