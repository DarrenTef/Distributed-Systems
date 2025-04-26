# CSE138 Fall 2024 Assignments

This repository consolidates work from three distributed systems assignments.

---

## Assignment 1: HTTP Service
- Developed an HTTP server handling `GET` and `POST` methods.
- Endpoints: `/hello`, `/hello/<name>`, `/test`.
- Responses vary by method and query.
- Packaged in a Docker container (port `8090`).
- Tech: JavaScript (Node.js / Express), Docker.

---

## Assignment 2: Key-Value Store
- Built an in-memory key-value store with `PUT`, `GET`, and `DELETE` operations.
- Part 1: Single-site storage.
- Part 2: Proxy instances forwarding to a main instance.
- Handles forwarding errors with `503` Service Unavailable.
- Tech: JavaScript (Node.js / Express), HTTP libraries, Docker networking.

---

## Assignment 3: Replicated Key-Value Store
- Created a distributed, fault-tolerant, causally consistent key-value store.
- Replicas sync updates and track causal dependencies (vector clocks or similar).
- Dynamic view management with `/view` API.
- Ensures causal consistency and eventual consistency.
- Tech: JavaScript (Node.js / Express), HTTP communication, Docker multi-container setup.

---

## Technologies Used
- JavaScript (Node.js)
- Express.js
- Docker
- Docker Networking (Custom subnets)

---

## Acknowledgements
Assignment designs provided by UCSC CSE138 Fall 2024 staff.

## Citations
- Docker Documentation
- Node.js HTTP Documentation
- Assignment test scripts provided by course staff.

---

*Individual for Asgn1, Team-based for Asgn2 & Asgn3.*
