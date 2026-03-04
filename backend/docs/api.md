# API Documentation

## Auth
- `POST /api/auth/login` — Admin login
- `POST /api/auth/logout` — Admin logout

## Services
- `GET /api/services` — List all services
- `GET /api/services?category=general|bundle` — List services by category
- `GET /api/services/:id` — Get service by ID
- `POST /api/services` — Create service (admin)
- `PUT /api/services/:id` — Update service (admin)
- `DELETE /api/services/:id` — Delete service (admin)

### Service Payload
- `title` (string, required)
- `description` (string, required, markdown supported)
- `category` (string, optional, `general` | `bundle`, defaults to `general`)

## Projects
- `GET /api/projects` — List all projects
- `GET /api/projects/:id` — Get project by ID
- `POST /api/projects` — Create project (admin)
- `PUT /api/projects/:id` — Update project (admin)
- `DELETE /api/projects/:id` — Delete project (admin)

## Enquiries
- `GET /api/enquiries` — List all enquiries (admin)
- `GET /api/enquiries/:id` — Get enquiry by ID (admin)
- `POST /api/enquiries` — Submit enquiry
- `DELETE /api/enquiries/:id` — Delete enquiry (admin)

## Blog Posts
- `GET /api/blogposts` — List all blog posts
- `GET /api/blogposts/:id` — Get blog post by ID
- `POST /api/blogposts` — Create blog post (admin)
- `PUT /api/blogposts/:id` — Update blog post (admin)
- `DELETE /api/blogposts/:id` — Delete blog post (admin)
