🧬 Express REST API Server
A modular Node.js + Express application serving both JSON-based API endpoints and basic web routes.
This server powers a research-focused website that manages posts, news, research projects, and team members.

⚙️ Features
✅ Modular MVC architecture (controllers, routes, models, middleware)
✅ Full CRUD operations for posts, news, research, users, categories and tags
✅ RESTful API available under /api
✅ Basic authentication for the entire API (configurable via .env)
✅ Request validation for POST / PUT / PATCH / DELETE
✅ Centralized error and logging utilities
✅ CORS support for frontend clients
✅ In-memory data models (no external DB required)

🧾 Environment Setup
Before running the server, create a local environment file.
Copy the example file:
cp .env.example .env

Open .env and adjust settings if needed:
ADMIN_USER=admin
ADMIN_PASS=12345
ENABLE_BASIC_AUTH=false

PORT=3000
HOST=localhost
NODE_ENV=development

🔐 Basic Authentication (Global API Protection)
All routes under /api are protected by Basic Authentication when enabled.
This means you must provide valid credentials (from .env) to access any API endpoint.
🧾 Example .env Configuration
ADMIN_USER=admin
ADMIN_PASS=12345
ENABLE_BASIC_AUTH=true
When ENABLE_BASIC_AUTH=true, every /api request requires this header:
Authorization: Basic YWRtaW46MTIzNDU=
(where YWRtaW46MTIzNDU= is Base64 for admin:12345)
If you set:
ENABLE_BASIC_AUTH=false
then the API becomes publicly accessible, and no authentication is required.

🚀 Installation
git clone https://github.com/lar888/work61
cd work61
Install dependencies: yarn
Run the development server: yarn dev
node src/server.mjs

Server running at:
👉 http://localhost:3000

📁 Project Structure
work61/
├── index.mjs
src/
├── config/
│ └── http.mjs
├── controllers/
│ ├── newsController.mjs
│ ├── pageController.mjs
│ ├── postController.mjs
│ ├── researchController.mjs
│ ├── usersController.mjs
│ ├── categoryController.mjs
│ └── tagController.mjs
├── data/
│ ├── db_news.mjs
│ ├── db_posts.mjs
│ ├── db_research.mjs
│ ├── db_users.mjs
│ ├── db_categories.mjs
│ └── db_tags.mjs
├── middleware/
│ ├── basicAuth.mjs
│ ├── errorHandlers.mjs
│ ├── newsValidation.mjs
│ ├── postsValidation.mjs
│ ├── researchValidation.mjs
│ ├── usersValidation.mjs
│ ├── categoriesValidation.mjs
│ └── tagsValidation.mjs
├── models/
│ ├── news.mjs
│ ├── posts.mjs
│ ├── research.mjs
│ ├── users.mjs
│ ├── categories.mjs
│ └── tags.mjs
├── routes/
│ ├── api/
│ │ ├── index.mjs
│ │ ├── news.mjs
│ │ ├── posts.mjs
│ │ ├── research.mjs
│ │ ├── users.mjs
│ │ ├── categories.mjs
│ │ └── tags.mjs
│ └── web/
│ ├── index.mjs
│ └── pages.mjs
├── utils/
│ ├── functions.mjs
│ ├── logger.mjs
│ └── slugify.mjs
├── server.mjs
└── .env

🌐 Routes Overview

🔸 Web Routes
Method Route Description
GET / Returns basic HTML/text response (root route)

🔸 API Routes (All Protected by Basic Auth if Enabled)
All RESTful endpoints are available under /api:

Resource Route Description
Posts /api/posts CRUD for scientific posts
News /api/news CRUD for research-related news
Research /api/research CRUD for research projects
Users /api/users CRUD for team members
Categories /api/categories CRUD for post categories
Tags /api/tags CRUD for post tags

Each resource supports:
GET /api/resource
GET /api/resource/:id
POST /api/resource
PUT /api/resource/:id
PATCH /api/resource/:id
DELETE /api/resource/:id

🧩 Example: Posts (/api/posts)
POST request:
{
	"title": "Molecular Dynamics of Protein Folding",
	"description": "Simulations reveal new folding pathways of small proteins.",
	"category": "Biophysics",
	"tags": ["protein", "folding", "simulation"],
	"year": 2025,
	"image": "https://picsum.photos/640/480?random=42",
	"selected": false
}

Response:
{
	"success": true,
	"data": { ... },
	"message": "Пост успішно створено"
}

📰 Example: News (/api/news)
Sample Data:
{
	"id": 1,
	"image": "https://picsum.photos/640/480?random=1",
	"date": "2025-01-05",
	"description": "Researchers identify a new protein folding pathway that may explain resilience in neurodegenerative diseases."
}

🔬 Example: Research (/api/research)
Sample Data:
{
	"id": 1,
	"image": "https://picsum.photos/640/480?random=1",
	"title": "Electron and Proton Transfer in Proteins",
	"description": "Life depends on the efficient movement of electrons and protons through protein structures. Our research focuses on the physical principles and structural determinants that govern these transfer processes, from redox cofactors to hydrogen-bonded networks. By combining biochemical, spectroscopic, and computational approaches, we seek to understand how proteins optimize charge transfer for processes such as respiration, photosynthesis, and enzymatic catalysis."
}

👩‍🔬 Example: Users (/api/users)
Sample Data:
{
	"id": 1,
	"image": "https://picsum.photos/640/480?random=1",
	"member": "Alice Morgan - Post Doctoral Researcher",
	"description": "Focuses on protein folding mechanisms and misfolding in neurodegenerative diseases. Her work combines biochemical assays with computational simulations to understand how proteins adopt stable structures and what happens when these processes go wrong, providing insights into Alzheimer’s and Parkinson’s disease."
}

📂 Categories API Example (/api/categories)
Sample Data:
{
	"id": 1,
	"title": "Biophysics",
	"alias": "biophysics"
}

🏷️ Tags API Example (/api/tags)
Sample Data:
{
	"id": 1,
	"title": "protein folding",
	"alias": "protein-folding"
}

⚠️ Error Handling
Global Error Middleware
Located in middleware/errorHandlers.mjs:
Logs all unexpected errors
Sends JSON { success: false, error: <message> } for /api/\* routes
Sends plain text for web routes

Validation Middleware
Located in middleware/validation.mjs:
Validates fields like title, description, category, tags, year, etc.
Returns:
{
	"success": false,
	"error": "Невірні дані посту: перевірте title, description, category, tags, year, image та selected"
}

📜 HTTP Configuration
Constant Description Value
HTTP_STATUS.OK Success 200
HTTP_STATUS.CREATED Created 201
HTTP_STATUS.BAD_REQUEST Invalid request 400
HTTP_STATUS.UNAUTHORIZED Unauthorized 401
HTTP_STATUS.NOT_FOUND Not found 404
HTTP_STATUS.INTERNAL_SERVER_ERROR Server error 500

🧾 Content Type Constants
Constant Description Value
CONTENT_TYPE.TEXT Plain text response text/plain; charset=utf-8
CONTENT_TYPE.HTML HTML response text/html; charset=utf-8
CONTENT_TYPE.JSON JSON response application/json; charset=utf-8
CONTENT_TYPE.FORM Form data submission application/x-www-form-urlencoded

🧠 Logging
Located at src/utils/logger.mjs
Example output:
[2025-10-19T21:48:10.342Z] API: Отримання списку новин
Functions:
log(message, data?)
error(message, err?)
info, warn, debug

🧪 Example Curl Commands

# Get all posts (with Basic Auth enabled)
curl -u admin:12345 http://localhost:3000/api/posts

# Create new post
curl -X POST http://localhost:3000/api/posts \
 -u admin:12345 \
 -H "Content-Type: application/json" \
 -d '{
"title":"Quantum Biology",
"description":"Study of quantum effects in living systems",
"category":"Biophysics",
"tags":["quantum","biology"],
"year":2025,
"image":"https://picsum.photos/640/480?random=5",
"selected":false
}'

🧱 Summary
Component Role
index.mjs Entry point
server.mjs Applies Basic Auth to /api, mounts routers
controllers/ Business logic for each resource
models/ In-memory CRUD operations
middleware/basicAuth.mjs Enforces Basic Authentication globally for API
routes/api/ REST API routes
routes/web/ Simple web routes
utils/logger.mjs Logging utility

🏁 License
## MIT License — free for personal and educational use.
