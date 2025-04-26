#!/bin/bash

# Step 1: Stop and remove the running container (if any)
CONTAINER_ID=$(docker ps -q --filter ancestor=cse138asgn1)

if [ ! -z "$CONTAINER_ID" ]; then
  echo "Stopping container $CONTAINER_ID..."
  docker stop $CONTAINER_ID
  echo "Removing container $CONTAINER_ID..."
  docker rm $CONTAINER_ID  # Remove the container after stopping it
else
  echo "No running container found for cse138asgn1."
fi

# Step 2: Build the Docker image
echo "Building the Docker image..."
docker build -t cse138asgn1 .

# Step 3: Remove stopped containers (optional)
echo "Cleaning up stopped containers..."
docker container prune -f

# Step 4: Run the new container
echo "Running the new container..."
docker run --rm -p 8090:8090 cse138asgn1
