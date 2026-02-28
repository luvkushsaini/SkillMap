import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RoadmapCard from '@/components/RoadmapCard';

const mockRoadmap = {
    id: 1,
    goal: 'Become a Backend Developer',
    description: 'Learn Java, Spring Boot, and databases',
    milestones: [],
};

describe('RoadmapCard', () => {
    it('renders roadmap goal correctly', () => {
        render(<RoadmapCard roadmap={mockRoadmap} />);
        expect(screen.getByText('Become a Backend Developer')).toBeInTheDocument();
    });

    it('renders description text', () => {
        render(<RoadmapCard roadmap={mockRoadmap} />);
        expect(screen.getByText('Learn Java, Spring Boot, and databases')).toBeInTheDocument();
    });

    it('renders milestone count', () => {
        const roadmapWithMilestones = { ...mockRoadmap, milestones: [{ id: 1 }, { id: 2 }] };
        render(<RoadmapCard roadmap={roadmapWithMilestones as any} />);
        expect(screen.getByText('2 milestones')).toBeInTheDocument();
    });
});
