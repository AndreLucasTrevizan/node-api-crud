# Node API and Typescript

Crud with NodeJs using Typescript and Json Web Tokens (JWT) to grant access to the endpoints.

## About the API

A simple API using NodeJs and TypeScript where you can manager all the users in the system, it's similar to an Admin Panel.

### Docker

I used Docker to run the application, so you need to run on terminal "<strong>docker-composer up -d</strong>" inside the root directory where is the docker-compose.yml file. But first of all, check the ports of the application, I used the <strong>3000</strong> to the API Container and <strong>9603</strong> to the Database Container, you need this two ports open on your PC.

### JWT

The API is protected with JsonWebTokens in some endpoints like <strong>GET /api/users</strong> where you can see all the users from the Database, then, you need to be an Admin User to access this.
