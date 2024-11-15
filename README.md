# Task Nest Monorepo

This monorepo contains a **Vite React client** and an **Express server** for building and serving a full-stack web application.

## Table of Contents

- [Structure](#structure)
- [Requirements](#requirements)
- [Setup](#setup)
- [Scripts](#scripts)
- [Development](#development)
- [Build](#build)
- [Proxy Configuration](#proxy-configuration)
- [Production Deployment](#production-deployment)

---

## Structure

task-nest/ 
├── client/ # Vite React application 
├── server/ # Express API server 
├── package.json # Root package.json with scripts and dependencies

## Requirements

- Node.js v16 or higher
- npm v7 or higher

---

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd task-nest

2. Install dependencies for the root, client, and server:
   ```
npm install
npm install --prefix client
npm install --prefix server
   ```

3. Ensure your server is running on http://localhost:5000


Scripts
Root Scripts

Start Both Client and Server:
npm run dev

Start Server Only:
npm run dev:server

Start Client Only:
npm run dev:client

Build Both Client and Server:
npm run build

Client-Specific Scripts

Start Development Server:
npm run dev --prefix client

Build Production Client:
npm run build --prefix client

Preview Production Build:
npm run preview --prefix client

Server-Specific Scripts

Start Development Server:
npm run dev --prefix server

Start Production Server:
npm run start --prefix server

Build Server (if applicable):
npm run build --prefix server

Development
To start the development environment for both the client and server simultaneously, run:

npm run dev

This will:

Start the Express server on http://localhost:5000.
Start the Vite development server on http://localhost:3000.


Build
To build both the client and server, run:

npm run build

This will:

Build the client into the client/dist folder.
Prepare the server for production deployment.


Production Deployment

For Client
Serve the client/dist folder using a static file server (e.g., Nginx).

For Server
Run the built server using Node.js:

node server/index.js


Combined Deployment
Use a reverse proxy (like Nginx) to serve both the client and API from a single domain.