# https://docs.docker.com/get-started/docker-concepts/building-images/writing-a-dockerfile/
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8090

CMD ["npm", "start"]