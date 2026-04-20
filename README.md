# DevGym

A hands-on practice environment for sharpening Angular and Spring Boot skills. Build a social feed/blog app ("DevFeed") from scratch, guided by a progressive task coach.

## Structure

```
dev-gym/
├── coach/          → Next.js dashboard — task list, progress tracking, reset
├── frontend/       → Angular 19 app (you build this)
├── backend/        → Spring Boot 3.5 API (you build this)
├── scripts/        → Reset scripts
└── README.md
```

## Quick Start

### 1. Start the Coach Dashboard
```bash
cd coach
npm run dev
# → http://localhost:3000
```

### 2. Start the Angular App (when ready)
```bash
cd frontend
ng serve
# → http://localhost:4200
```

### 3. Start the Spring Boot API (when ready)
```bash
cd backend
./mvnw spring-boot:run
# → http://localhost:8080
```

## How It Works

1. Open the **Coach Dashboard** at `localhost:3000`
2. Pick **Angular** or **Spring Boot** tab
3. Work through tasks in order — each builds on the previous
4. Click task cards to see objectives, acceptance criteria, hints, and relevant files
5. Mark tasks complete as you finish them (progress saved in browser)
6. Use the **Reset** buttons or the reset script to start over

## Reset

Reset a specific project to its clean state:
```bash
./scripts/reset.sh angular-clean   # Reset Angular to starter
./scripts/reset.sh spring-clean    # Reset Spring to starter
./scripts/reset.sh all-clean       # Reset everything
```

## Task Roadmap

### Angular (15 tasks)
| Phase | Focus |
|-------|-------|
| 1. Foundation | App shell, routing, pages |
| 2. Services & HTTP | Auth service, reactive forms, API calls |
| 3. Components & Architecture | Reusable components, auth guards, input/output |
| 4. Advanced Patterns | Interceptors, route params, lazy loading |
| 5. Polish | Custom pipes, infinite scroll, error handling |

### Spring Boot (13 tasks)
| Phase | Focus |
|-------|-------|
| 1. Foundation | Config, entities, repositories |
| 2. Services & REST | Auth, JWT, CRUD controllers, DTOs |
| 3. Security & Middleware | JWT filter, user endpoints |
| 4. Advanced Features | Likes, comments, relationships |
| 5. Testing & Polish | Unit tests, integration tests, error handling |
