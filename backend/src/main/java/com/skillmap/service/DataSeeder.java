package com.skillmap.service;

import com.skillmap.model.Milestone;
import com.skillmap.model.Roadmap;
import com.skillmap.repository.RoadmapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private RoadmapRepository roadmapRepository;

    @Override
    public void run(String... args) {
        if (roadmapRepository.findByIsSeededTrue().isEmpty()) {
            seedRoadmaps();
        }
    }

    private void seedRoadmaps() {
        createRoadmap("Backend Developer", "Master backend development with Java and Spring Boot",
            List.of("Learn Java OOP", "Spring Boot Basics", "REST APIs", "PostgreSQL", "JUnit Testing", "Deploy on Cloud"));
        createRoadmap("Frontend Developer", "Build modern responsive web interfaces",
            List.of("HTML & CSS", "JavaScript ES6", "React.js", "Next.js", "Tailwind CSS", "Jest Testing"));
        createRoadmap("Full Stack Developer", "Become a complete web developer",
            List.of("JavaScript Fundamentals", "Node.js", "React", "Databases", "REST APIs", "DevOps Basics"));
        createRoadmap("Data Scientist", "Analyze data and build machine learning models",
            List.of("Python Basics", "Pandas & NumPy", "Data Visualization", "ML with sklearn", "Deep Learning Intro", "Model Deployment"));
        createRoadmap("DevOps Engineer", "Automate deploy and manage infrastructure",
            List.of("Linux Basics", "Git & GitHub", "Docker", "Kubernetes", "CI/CD Pipelines", "Cloud AWS/GCP"));
        createRoadmap("Android Developer", "Build native Android apps",
            List.of("Java/Kotlin Basics", "Android Studio Setup", "UI Layouts", "APIs Integration", "Local Storage", "Publish on Play Store"));
        createRoadmap("Cloud Architect", "Design and manage scalable cloud infrastructure",
            List.of("Networking Basics", "AWS Core Services", "IAM & Security", "S3 & EC2", "Serverless", "Certifications"));
        createRoadmap("Cybersecurity Analyst", "Protect systems and networks from threats",
            List.of("Networking Fundamentals", "Linux", "Python Scripting", "Ethical Hacking", "OWASP Top 10", "CTF Practice"));
    }

    private void createRoadmap(String goal, String description, List<String> milestones) {
        Roadmap roadmap = new Roadmap();
        roadmap.setGoal(goal);
        roadmap.setDescription(description);
        roadmap.setSeeded(true);

        for (int i = 0; i < milestones.size(); i++) {
            Milestone m = new Milestone();
            m.setTitle(milestones.get(i));
            m.setDescription("Complete this milestone to progress in your " + goal + " journey.");
            m.setResourceUrl("https://www.google.com/search?q=" + milestones.get(i).replace(" ", "+"));
            m.setOrderIndex(i + 1);
            m.setRoadmap(roadmap);
            roadmap.getMilestones().add(m);
        }

        roadmapRepository.save(roadmap);
    }
}
