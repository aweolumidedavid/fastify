# fastify
This is a simple backend app for user authentication and authorization.

# Operations Supported includes
# User
- user creation
- login
- get all users

# Blog post
- BlogPost creation
- update by id
- get by Id
- get all post
- paginated get all post
- delete post by id

# API's Authenticated
- Blog creation
- Blog update
- Blog delete

# Tests
- implement the test of the app server
- implement the user sign
- implement the user login

# Routes
# User
http://localhost:4500/api/users/register
http://localhost:4500/api/ 
http://localhost:4500/api/users/login

# Blog Post
http://localhost:4500/api/blog-post/view/:id
http://localhost:4500/api/blog-post/create
http://localhost:4500/api/blog-post/update/:id
http://localhost:4500/api/blog-post/:id
http://localhost:4500/api/blog-post/view-all
http://localhost:4500/api/blog-post/all

# COMMANDS
## Initialise prisma
yarn prisma init --datasource-provider postgresql
### Migrate the schema
yarn prisma migrate dev --name init

# Start the app
yarn dev

# ENV sample
DATABASE_URL="postgresql://replaceme:password@localhost:5432/mydb?schema=public"
TOKEN_SECRET=NextLevel
