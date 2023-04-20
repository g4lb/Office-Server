# Office Server
Office Server is a REST API server built with NestJS that allows employees to log their arrival and departure times, view their past logs, and notify the system if they have been diagnosed with COVID-19.

## Installation
To install the dependencies, run:
```bash
npm install
```

# Running the Server
To start the server, run:
```bash
npm run start
```
The server will start listening on port 5000.

# Running the Tests
To run the tests, run:
```bash
npm run test
```

# Swagger
Open your web browser and navigate to http://localhost:5000/logs to access Swagger UI and explore the API endpoints.

# Docker
update the db configuration inside app.module.ts <br />
To run the application in a Docker container, first build the Docker image:

```bash
docker build -t office-server .
```
Then run the application in a Docker container:

```bash
docker run -p 5000:5000 office-server
```
This will start a container with the application running on port 5000.