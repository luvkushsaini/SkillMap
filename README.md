# SkillMap 🗺️ — AI-Powered Learning Roadmap Generator

> Full-stack app: Next.js + Java Spring Boot + Gemini AI

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React 18, Tailwind CSS |
| Backend | Java 17, Spring Boot 3, Spring Security |
| Database | PostgreSQL |
| Auth | JWT + BCrypt |
| AI | Gemini API |
| Testing | JUnit 5 + Jest |
| Deploy | Vercel (FE) + Render (BE) |

## Quick Start

### 1. Database
```sql
CREATE DATABASE skillmap;
```

### 2. Backend
```bash
cd backend
# Edit application.properties — set DB password, JWT secret, Gemini API key
./mvnw spring-boot:run
# Starts on http://localhost:8080
# Auto-creates tables + seeds 8 roadmaps on first run
```

### 3. Frontend
```bash
cd frontend
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:8080" > .env.local
npm run dev
# Starts on http://localhost:3000
```

## API Endpoints
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Register |
| POST | /api/auth/login | No | Login → JWT |
| GET | /api/auth/me | Yes | Current user |
| GET | /api/roadmaps | No | Browse all seeded |
| GET | /api/roadmaps/{id} | No | Get roadmap + milestones |
| POST | /api/roadmaps/generate | Yes | AI generate from goal |
| GET | /api/roadmaps/my | Yes | My generated roadmaps |
| GET | /api/progress/{roadmapId} | Yes | Progress on roadmap |
| PUT | /api/progress/update | Yes | Mark milestone done |
| GET | /api/progress/summary | Yes | All roadmaps % complete |

## Running Tests
```bash
# Backend
cd backend && ./mvnw test

# Frontend
cd frontend && npm test
```

## Deployment
- **Backend** → Render.com (set DATABASE_URL, JWT_SECRET, GEMINI_API_KEY)
- **Frontend** → Vercel (set NEXT_PUBLIC_API_URL)
- **Database** → Render PostgreSQL (free tier)

